import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmSortingComponent } from './film-sorting.component';

describe('FilmSortingComponent', () => {
    let component: FilmSortingComponent;
    let fixture: ComponentFixture<FilmSortingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilmSortingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FilmSortingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
