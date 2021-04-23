import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatfirestoreComponent } from './chatfirestore.component';

describe('ChatfirestoreComponent', () => {
  let component: ChatfirestoreComponent;
  let fixture: ComponentFixture<ChatfirestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatfirestoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatfirestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
