import { Sendable } from '../../models/Sendable';
import { TaskBuilder } from '../../models/TaskBuilder';
import { htmlToElement } from '../../utils/dom';
import { Parser } from '../Parser';

export class TheJobOverflow extends Parser {
  public getMatchPatterns(): string[] {
    return ['http://thejoboverflow.com/problem/*'];
  }

  public async parse(url: string, html: string): Promise<Sendable> {
    const doc = htmlToElement(html);
    const task = new TaskBuilder('TheJobOverflow').setUrl(url);

    const titleStr = doc.querySelector('#nav-problem h5').textContent;
    task.setName(titleStr.replace(/\s*:$/, ''));

    const inputs = [...doc.querySelectorAll('.sample-test > .input > .content')];
    const outputs = [...doc.querySelectorAll('.sample-test > .output > .content')]
    for (let i = 0; i < inputs.length; i++) {
      task.addTest(inputs[i].textContent, outputs[i].textContent);
    }

    return task.build();
  }
}
