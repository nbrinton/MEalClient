import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeMealComponent } from './recipe-meal.component';

describe('RecipeMealComponent', () => {
  let component: RecipeMealComponent;
  let fixture: ComponentFixture<RecipeMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeMealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
