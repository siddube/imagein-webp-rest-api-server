/* ==========================================
Unit Tests Reporter - reporter.ts
1) Jasmine Unit Test Suite Reporter
============================================= */

// import modules from Jasimne Spec Reporter module
import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;

// Setup customprocessor
class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `${log}`;
  }
}

// Get enironment of development tests
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor]
  })
);
