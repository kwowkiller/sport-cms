import {EventEmitter, Input, Output} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

export abstract class CustomInput implements ControlValueAccessor {
  @Input()
  model: any;
  @Output()
  modelChange = new EventEmitter();

  onChangeListener: (value: any) => {};
  onTouchedListener: () => {};

  registerOnChange(fn: any) {
    this.onChangeListener = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedListener = fn;
  }

  writeValue(obj: any) {
    this.model = obj;
    this.modelChange.emit(this.model);
  }

  onModelChange(value: any) {
    this.model = value;
    this.modelChange.emit(value);
    if (this.onChangeListener) {
      this.onTouchedListener();
      this.onChangeListener(value);
    }
  }
}
