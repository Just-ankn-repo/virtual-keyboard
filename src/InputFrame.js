/* global document */

export default class InputFrame {
  constructor() {
    this.selfObj = '';
  }

  generate() {
    this.selfObj = document.createElement('TEXTAREA');
    this.selfObj.className = 'input_frame';
    this.selfObj.rows = 10;
  }

  print(value) {
    this.selfObj.focus();
    this.cursorPosition = this.selfObj.selectionStart;
    if (value === 'Enter') {
      this.selfObj.setRangeText('\n', this.selfObj.selectionStart, this.selfObj.selectionEnd, 'end');
    } else if (value === 'Tab') {
      this.selfObj.setRangeText('    ', this.selfObj.selectionStart, this.selfObj.selectionEnd, 'end');
    } else if (value === '―') {
      this.selfObj.setRangeText(' ', this.selfObj.selectionStart, this.selfObj.selectionEnd, 'end');
    } else if (value === 'Del') {
      if (this.selfObj.selectionStart === this.selfObj.selectionEnd) {
        this.selfObj.setRangeText('', this.selfObj.selectionStart, this.selfObj.selectionStart + 1, 'end');
      } else {
        this.selfObj.setRangeText('', this.selfObj.selectionStart, this.selfObj.selectionEnd, 'end');
      }
    } else if (value === 'Backspace') {
      if (this.selfObj.selectionStart === this.selfObj.selectionEnd) {
        this.selfObj.setRangeText('', this.selfObj.selectionStart - 1, this.selfObj.selectionStart, 'end');
      } else {
        this.selfObj.setRangeText('', this.selfObj.selectionStart, this.selfObj.selectionEnd, 'end');
      }
    } else if (value === '⬅') {
      this.selfObj.selectionStart = this.cursorPosition - 1;
      this.selfObj.selectionEnd = this.selfObj.selectionStart;
    } else if (value === '➡') {
      this.selfObj.selectionStart = this.cursorPosition + 1;
      this.selfObj.selectionEnd = this.selfObj.selectionStart;
    } else if (value === '⬆') {
      let positionInRow = this.selfObj.selectionStart;
      const rows = this.selfObj.value.split('\n');
      if (this.selfObj.selectionStart > rows[0].length) {
        let i = 0;
        while (positionInRow > rows[i].length) {
          positionInRow -= (rows[i].length + 1);
          i += 1;
        }
        let newPosition = 0;
        let j = 0;
        while (j < i - 1) {
          newPosition += rows[j].length + 1;
          j += 1;
        }
        const rowLength = (rows[j].length > positionInRow) ? positionInRow : rows[j].length;
        newPosition += rowLength;
        this.selfObj.selectionStart = newPosition;
        this.selfObj.selectionEnd = this.selfObj.selectionStart;
      }
    } else if (value === '⬇') {
      let positionInRow = this.selfObj.selectionStart;
      const rows = this.selfObj.value.split('\n');
      let i = 0;
      while (positionInRow > rows[i].length) {
        positionInRow -= (rows[i].length + 1);
        i += 1;
      }
      if (i < rows.length - 1) {
        let newPosition = 0;
        let j = 0;
        while (j < i + 1) {
          newPosition += rows[j].length + 1;
          j += 1;
        }
        const rowLength = (rows[j].length > positionInRow) ? positionInRow : rows[j].length;
        newPosition += rowLength;
        this.selfObj.selectionStart = newPosition;
        this.selfObj.selectionEnd = this.selfObj.selectionStart;
      }
    } else {
      this.selfObj.setRangeText(value, this.selfObj.selectionStart, this.selfObj.selectionEnd, 'end');
    }
    this.selfObj.focus();
    return false;
  }
}
