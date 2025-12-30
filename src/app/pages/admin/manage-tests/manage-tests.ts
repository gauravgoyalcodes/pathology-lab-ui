import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestService } from '../../../services/test.service';
import { Test } from '../../../models/test.model';

@Component({
  selector: 'app-manage-tests',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './manage-tests.html',
  styleUrl: './manage-tests.css',
})
export class ManageTests implements OnInit {
  tests: Test[] = [];
  categories: string[] = [];
  selectedCategory = '';
  loading = false;
  searchText = '';

  constructor(
    private testService: TestService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests() {
    this.loading = true;
    this.testService.getTests().subscribe({
      next: (res) => {
        this.tests = res || [];
        if (this.tests.length > 0) {
          // Sort categories so they appear alphabetically in the sidebar
          this.categories = [...new Set(this.tests.map(t => t.category))].sort();

          // Only set default if nothing is currently selected
          if (!this.selectedCategory) {
            this.selectedCategory = this.categories[0];
          }
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Fetch Error:", err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.searchText = '';
  }

  get filteredTests(): Test[] {
    const term = this.searchText.trim().toLowerCase();

    return this.tests.filter(test =>
      test.category === this.selectedCategory &&
      (!term || test.testName.toLowerCase().includes(term))
    );
  }

  getTestCountByCategory(category: string): number {
    return this.tests.filter(test => test.category === category).length;
  }

  // Dummy methods for UI buttons
  onEdit(test: any) { console.log('Edit clicked for:', test.testCode); }
  onDelete(code: string) { console.log('Delete clicked for:', code); }

}