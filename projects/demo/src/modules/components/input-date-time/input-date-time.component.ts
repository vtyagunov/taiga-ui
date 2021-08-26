import {default as example1Html} from '!!raw-loader!./examples/1/index.html';
import {default as example1Ts} from '!!raw-loader!./examples/1/index.ts';

import {default as example2Html} from '!!raw-loader!./examples/2/index.html';
import {default as example2Ts} from '!!raw-loader!./examples/2/index.ts';

import {default as exampleDeclareForm} from '!!raw-loader!./examples/import/declare-form.txt';
import {default as exampleImportModule} from '!!raw-loader!./examples/import/import-module.txt';
import {default as exampleInsertTemplate} from '!!raw-loader!./examples/import/insert-template.txt';

import {Component, forwardRef} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {
    ALWAYS_FALSE_HANDLER,
    TUI_LAST_DAY,
    TuiBooleanHandler,
    TuiDateAutofillName,
    TuiDay,
    TuiMonth,
    TuiTime,
    TuiTimeMode,
} from '@taiga-ui/cdk';
import {TuiNamedDay} from '@taiga-ui/kit';
import {changeDetection} from '../../../change-detection-strategy';
import {FrontEndExample} from '../../interfaces/front-end-example';
import {AbstractExampleTuiControl} from '../abstract/control';
import {ABSTRACT_PROPS_ACCESSOR} from '../abstract/inherited-documentation/abstract-props-accessor';

@Component({
    selector: 'example-tui-input-date-time',
    templateUrl: './input-date-time.template.html',
    changeDetection,
    providers: [
        {
            provide: ABSTRACT_PROPS_ACCESSOR,
            useExisting: forwardRef(() => ExampleTuiInputDateTimeComponent),
        },
    ],
})
export class ExampleTuiInputDateTimeComponent extends AbstractExampleTuiControl {
    private readonly today = TuiDay.currentLocal();

    readonly exampleDeclareForm = exampleDeclareForm;
    readonly exampleImportModule = exampleImportModule;
    readonly exampleInsertTemplate = exampleInsertTemplate;

    readonly example1: FrontEndExample = {
        TypeScript: example1Ts,
        HTML: example1Html,
    };

    readonly example2: FrontEndExample = {
        TypeScript: example2Ts,
        HTML: example2Html,
    };

    readonly minVariants = [
        new TuiDay(2017, 2, 5),
        new TuiDay(1900, 0, 1),
        [this.today.append({day: -1}), new TuiTime(12, 20)],
    ];

    min = null;

    readonly maxVariants = [
        new TuiDay(2017, 11, 11),
        new TuiDay(2020, 2, 5),
        new TuiDay(2300, 0, 1),
        [this.today.append({day: +1}), new TuiTime(16, 20)],
    ];

    max = null;

    defaultActiveYearMonthVariants = [
        TuiMonth.currentLocal(),
        new TuiMonth(2020, 2),
        new TuiMonth(2017, 2),
    ];
    defaultActiveYearMonth = this.defaultActiveYearMonthVariants[0];

    readonly disabledItemHandlerVariants: ReadonlyArray<TuiBooleanHandler<TuiDay>> = [
        ALWAYS_FALSE_HANDLER,
        ({day}) => day % 3 === 0,
    ];

    disabledItemHandler = this.disabledItemHandlerVariants[0];

    readonly itemsVariants = [
        [],
        [new TuiNamedDay(TUI_LAST_DAY.append({year: -1}), 'Unill today')],
    ];

    items = this.itemsVariants[0];

    readonly autocompleteVariants = ['off', 'bday'];

    autocomplete: TuiDateAutofillName | null = null;

    cleaner = false;

    readonly control = new FormControl(null, Validators.required);

    readonly modeVariants: ReadonlyArray<TuiTimeMode> = [
        'HH:MM',
        'HH:MM:SS',
        'HH:MM:SS.MSS',
    ];

    mode = this.modeVariants[0];
}
