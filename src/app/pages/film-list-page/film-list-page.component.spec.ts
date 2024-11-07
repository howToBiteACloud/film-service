import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmListPageComponent } from './film-list-page.component';

describe('FilmListPageComponent', () => {
    let component: FilmListPageComponent;
    let fixture: ComponentFixture<FilmListPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilmListPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FilmListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
