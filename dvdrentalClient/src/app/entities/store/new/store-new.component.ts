import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { StoreService } from '../store.service';
import { IStore } from '../istore';
import { Globals, BaseNewComponent, PickerDialogService, ErrorService } from 'src/app/common/shared';
import { GlobalPermissionService } from 'src/app/core/global-permission.service';

import { AddressService } from 'src/app/entities/address/address.service';
import { StaffService } from 'src/app/entities/staff/staff.service';

@Component({
  selector: 'app-store-new',
  templateUrl: './store-new.component.html',
  styleUrls: ['./store-new.component.scss'],
})
export class StoreNewComponent extends BaseNewComponent<IStore> implements OnInit {
  title: string = 'New Store';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<StoreNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public global: Globals,
    public pickerDialogService: PickerDialogService,
    public storeService: StoreService,
    public errorService: ErrorService,
    public addressService: AddressService,
    public staffService: StaffService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(formBuilder, router, route, dialog, dialogRef, data, global, pickerDialogService, storeService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Store';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.checkPassedData();
    this.setPickerSearchListener();
  }

  setForm() {
    this.itemForm = this.formBuilder.group({
      addressId: ['', Validators.required],
      addressDescriptiveField: ['', Validators.required],
      managerStaffId: ['', Validators.required],
      staffDescriptiveField: ['', Validators.required],
    });

    this.fields = [];
  }

  setAssociations() {
    this.associations = [
      {
        column: [
          {
            key: 'addressId',
            value: undefined,
            referencedkey: 'addressId',
          },
        ],
        isParent: false,
        table: 'address',
        type: 'ManyToOne',
        service: this.addressService,
        label: 'address',
        descriptiveField: 'addressDescriptiveField',
        referencedDescriptiveField: 'addressId',
      },
      {
        column: [
          {
            key: 'managerStaffId',
            value: undefined,
            referencedkey: 'staffId',
          },
        ],
        isParent: false,
        table: 'staff',
        type: 'ManyToOne',
        service: this.staffService,
        label: 'staff',
        descriptiveField: 'staffDescriptiveField',
        referencedDescriptiveField: 'staffId',
      },
    ];
    this.parentAssociations = this.associations.filter((association) => {
      return !association.isParent;
    });
  }

  onSubmit() {
    let store = this.itemForm.getRawValue();
    super.onSubmit(store);
  }
}
