import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'soer-block-test',
  templateUrl: './block-test.component.html',
  styleUrls: ['./block-test.component.scss'],
})
export class BlockTestComponent implements OnInit {
  @Input() text = '';

  question = '';
  answers: {answer: string, correct: boolean}[] = [];


  ngOnInit(): void {
    const blocks = this.text.split("\n\n");
    const answersText = blocks.pop();
    const question = blocks.join("\n\n");

    if (answersText) {
      const answers = (answersText + '').split("\n").map(tmpAnswer => {
        const correct = tmpAnswer.substring(0, 1) === '+';
        return {answer: tmpAnswer.substring(1), correct};
      });
      this.answers = answers;
    }

    this.question = question;


  }

}
