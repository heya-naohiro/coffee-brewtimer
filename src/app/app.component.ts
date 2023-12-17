import { Component } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { RecipeStorageService, Recipe } from './service/recipestorage.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RecipeStorageService]
})
export class AppComponent {
  timer: Observable<Date> | undefined;
  millisecondsCounter = interval(100);
  nowdsec = 0;
  alarmindex = 0;
  subscription: Subscription | undefined;
  activerecipeindex = 0;

  recipes: Recipe[] = [];
  private soundAudio: HTMLAudioElement = new Audio(environment.alarmSource);

  constructor(private recipe: RecipeStorageService) {}
  public reset() {
    this.nowdsec = 0;
    this.alarmindex = 0;
  }

  public isStopped(): boolean {
    return this.subscription === undefined || this.subscription.closed
  }

  public ngOnInit() {
    this.recipes = this.recipe.fetch()
    // active indexを覚えておく
    for (let i = 0 ; i < this.recipes.length; i++) {
      if (this.recipes[i].active) {
        this.activerecipeindex = i;
        break;
      }
    }
  }
  public startTimer() {
    if (this.subscription === undefined || this.subscription.closed) {
      this.soundAudio.load();
      this.subscription = this.millisecondsCounter.subscribe(() => {
        this.nowdsec = this.nowdsec + 1;
        if (this.isAlarmPoint()) {
          this.playAlarm();
        }
      });
    }
  }
  public isAlarmPoint(): boolean {
    if (this.recipes[this.activerecipeindex].alarm.length > this.alarmindex 
      && this.recipes[this.activerecipeindex].alarm[this.alarmindex] == this.nowdsec){
        this.alarmindex = this.alarmindex + 1
      return true;
    }
    return false
  }

  public stopTimer() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  public playAlarm() {
    this.soundAudio.play();
    setTimeout(() => {
      this.soundAudio.pause();
      this.soundAudio.currentTime = 0;
      /*
      this.soundAudio.play();
      
      setTimeout(() => {
        this.soundAudio.pause();
        this.soundAudio.currentTime = 0;
      }, 500)
      */
    }, 1500)
   //this.soundAudio.pause();

  }
  ngOnDestroy() {
    this.nowdsec = 0;
  }
  title = 'coffee-brewtimer';
}
