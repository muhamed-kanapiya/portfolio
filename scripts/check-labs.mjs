import assert from "node:assert/strict";
import vm from "node:vm";
export function checkLabs(context) {
  const run = (code) => vm.runInContext(code, context);
  const data = run("({projects:LAB_PROJECTS,tasks:LAB_TASKS})");
  for (const topic of ["seo", "google-ads"])
    for (const project of data.projects) {
      context.labTestTopic = topic;
      context.labTestId = project.id;
      run(
        `var p=LAB_PROJECTS.find(p=>p.id===labTestId);var x=labDefaults(p);var t={};`,
      );
      assert.equal(run("labKeywords(p).length"), 32);
      assert.equal(new Set(run("labKeywords(p).map(k=>k.id)")).size, 32);
      for (const task of data.tasks[topic]) {
        context.labTestTask = task.id;
        assert.equal(
          run(
            "labChecks(labTestTopic,LAB_TASKS[labTestTopic].find(t=>t.id===labTestTask),x,p,t).every(c=>c.passed)",
          ),
          false,
          topic + "/" + task.id + " must start unsolved",
        );
      }
      run(`x={...x,robots:'User-agent: *\\nAllow: /\\nDisallow: /account/\\nDisallow: /search/\\nSitemap: '+p.domain+'/sitemap.xml',sitemap:labPages(p).filter(p=>['money','guide'].includes(p.kind)).map(p=>p.path),noindex:false,canonical:'self',mobile:true,imageKB:400,serverMS:400,jsKB:200,depth:2,linked:true,coverage:85,title:p.core.en+' — professional services in Kazakhstan',description:'Explore our services, compare available options and request a consultation with a specialist for your project.',redirect:301,redirectTarget:'/services/main/',tag:'gtm',tagId:'G-DEMO'+p.idSuffix,event:'generate_lead',trigger:'form',duplicate:false,primary:'qualified_lead',crm:true,dedup:true,geo:'project',presence:true,network:'search',landing:'/services/main/',headline:p.core.en+' — book a consultation',match:'phrase',daily:9000,maxCPC:1500,strategy:'conversions',targetCPA:12000,days:35,lag:7,negatives:'jobs\\nfree online training\\nfree template\\nsalary'};
  x.selected=labKeywords(p).filter(k=>k.fit&&(labTestTopic==='seo'||k.intent==='commercial')).map(k=>k.id);
  x.mapping=Object.fromEntries(labKeywords(p).filter(k=>k.fit).map(k=>[k.id,k.intent==='information'?'guide':'service']));
  for(const action of ['crawl','build','verify','submit','publish','form','click','inspect','crm','run'])t=labTool(action,x,p,t,labTestTopic,'demo-'+p.idSuffix);`);
      for (const task of data.tasks[topic]) {
        context.labTestTask = task.id;
        const failures = run(
          "labChecks(labTestTopic,LAB_TASKS[labTestTopic].find(t=>t.id===labTestTask),x,p,t).filter(c=>!c.passed).map(c=>c.id)",
        );
        assert.equal(
          failures.length,
          0,
          topic + "/" + project.id + "/" + task.id + ": " + failures.join(", "),
        );
      }
      assert.equal(run("labAnalyticsOK(x,t,p)"), true);
      assert.equal(run("labAnalyticsOK({...x,duplicate:true},t,p)"), false);
      assert.equal(run('labAnalyticsOK({...x,consent:"denied"},t,p)'), false);
      assert.equal(
        run('labEvent({...x,consent:"denied"},t,p,"form").events.length'),
        0,
      );
      assert.equal(
        run('labTool("submit",{...x,sitemap:[]},p,t,labTestTopic).submitted'),
        null,
      );
      assert.equal(
        run(
          'labChecks(labTestTopic,LAB_TASKS[labTestTopic].find(t=>t.id==="capstone"),{...x,robots:"User-agent: *\\nDisallow: /"},p,t).every(c=>c.passed)',
        ),
        false,
      );
      if (topic === "seo") {
        assert.equal(
          run('labSimulate("seo",{...x,noindex:true},p,t).indexable'),
          0,
        );
        assert.equal(
          run('labSimulate("seo",{...x,canonical:"home"},p,t).indexable'),
          0,
        );
        assert.ok(
          run(
            'labSimulate("seo",x,p,t).clicks>labSimulate("seo",{...x,coverage:20},p,t).clicks',
          ),
        );
        assert.ok(
          run(
            'labSimulate("seo",x,p,t).series.at(-1).value>labSimulate("seo",x,p,t).series[0].value',
          ),
        );
      } else {
        assert.ok(
          run(
            'labSimulate("google-ads",x,p,t).quality>labSimulate("google-ads",{...x,geo:"other"},p,t).quality',
          ),
        );
        assert.equal(
          run('labSimulate("google-ads",{...x,landing:"/missing/"},p,t).leads'),
          0,
        );
        assert.equal(
          run('labSimulate("google-ads",{...x,selected:[]},p,t).spend'),
          0,
        );
        assert.ok(
          run(
            'labSimulate("google-ads",x,p,t).measured>labSimulate("google-ads",{...x,days:7},p,t).measured',
          ),
        );
      }
    }
  assert.equal(
    run(
      'labRobots("User-agent: *\\nDisallow: /\\nAllow: /services/", "/services/main/").allowed',
    ),
    true,
  );
  assert.equal(
    run('labRobots("User-agent: *\\nDisallow: /*.pdf$", "/guide.pdf").allowed'),
    false,
  );
  assert.equal(
    run(
      'labRobots("User-agent: *\\nDisallow: /\\nUser-agent: Googlebot\\nAllow: /", "/").allowed',
    ),
    true,
  );
  assert.equal(
    run('labRobots("User-agent: *\\nDisallow: /x\\nAllow: /x", "/x").allowed'),
    true,
  );
  assert.equal(
    run('labRobots("User-agent: *\\nDisallow:", "/").allowed'),
    true,
  );
  assert.equal(run('labBlocked("office repair","air")'), false);
  assert.equal(
    run('labBlocked("ремонт стиральной машины","стиральной машины")'),
    true,
  );
  assert.equal(
    run(
      'labClean({selected:["bad"],sitemap:["<script>"],mapping:{bad:"guide"},imageKB:Infinity},LAB_PROJECTS[0]).selected.length',
    ),
    0,
  );
  for (const topic of ["seo", "google-ads"]) {
    context.labTestTopic = topic;
    run(
      'var gates={};var jr=COURSES.find(c=>c.id===labTestTopic+"-junior");var mid=COURSES.find(c=>c.id===labTestTopic+"-middle");var senior=COURSES.find(c=>c.id===labTestTopic+"-senior");',
    );
    assert.equal(run("courseAccess(jr,gates).unlocked"), true);
    assert.equal(run("courseAccess(mid,gates).unlocked"), false);
    run(
      "gates[jr.id]={enrolled:true,completed:jr.lessons.map(l=>l.id),best:79,attempts:1}",
    );
    assert.equal(run("courseAccess(mid,gates).unlocked"), false);
    run("gates[jr.id].best=80");
    assert.equal(run("courseAccess(mid,gates).unlocked"), true);
    assert.equal(run("courseAccess(senior,gates).unlocked"), false);
    run(
      "gates[mid.id]={enrolled:true,completed:mid.lessons.map(l=>l.id),best:100,attempts:1}",
    );
    assert.equal(run("courseAccess(senior,gates).unlocked"), true);
    run("gates[jr.id].completed.pop()");
    assert.equal(run("courseAccess(mid,gates).unlocked"), false);
    assert.equal(run("courseAccess(senior,gates).unlocked"), false);
  }
  console.log(
    "Checked 128 solvable project tasks, 128 failing starts, sequential course gates, robots precedence, stale tools, consent, query intent and model sensitivity.",
  );
}
