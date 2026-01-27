import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PhleboService } from '../../../services/phlebo.service';
import { PhleboResponseModel } from '../../../models/phlebo-response.model';

@Component({
  selector: 'app-manage-phlebos',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './manage-phlebos.html',
  styleUrl: './manage-phlebos.css',
})
export class ManagePhlebos implements OnInit {

  phlebos: PhleboResponseModel[] = [];
  filteredPhlebos: PhleboResponseModel[] = [];

  loadingPhlebos = false;
  error = '';
  success = '';
  searchTerm: string = '';

  constructor(
    private phleboService: PhleboService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPhlebos();
  }

  private resetMessages(): void {
    this.success = '';
    this.error = '';
  }

  private loadPhlebos(): void {
    this.resetMessages();
    this.loadingPhlebos = true;

    this.phleboService.getPhlebos().subscribe({
      next: (res: PhleboResponseModel[]) => {
        this.phlebos = res;
        this.filteredPhlebos = res;

        if (!res || res.length === 0) {
          this.success = 'No Phlebos Found';
        }

        this.loadingPhlebos = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Failed to load phlebos', err);
        this.error = 'Failed to load phlebos, please try again later';
        this.loadingPhlebos = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPhlebos = [...this.phlebos];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();

    this.filteredPhlebos = this.phlebos.filter(phlebo => {
      return (
        phlebo.name?.toLowerCase().includes(term) ||
        phlebo.phone?.includes(term) ||
        phlebo.branchId?.toLowerCase().includes(term) ||
        phlebo.id?.toString().includes(term)
      );
    });
  }
}
