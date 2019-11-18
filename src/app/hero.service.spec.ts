import { TestBed } from "@angular/core/testing";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HeroService } from "./hero.service";

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService}
      ]
    })

    service = TestBed.get(HeroService);
    httpTestingController = TestBed.get(HttpTestingController);
  })

  describe('getHero', () => {
    it('should call get with correct URL', () => {
      service.getHero(4).subscribe(); // act

      const request = httpTestingController.expectOne('api/heroes/4');
      request.flush({id: 4, name: 'SuperDude', strength: 100});
      httpTestingController.verify();
    })
  })
})
