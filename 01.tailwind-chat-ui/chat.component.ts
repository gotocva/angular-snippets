import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class ChatComponent implements OnInit {

  public inputText: string = '';
  public currentQuestionIndex = 0;
  public questionLists = ['Hey ! What is your email id ?', 'Next tell me, What is your password ?'];
  public answerList: any = [];

  public chatList: any = [];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  /**
   * 
   */
  ngOnInit(): void {
    //
    this.chatList.push({fromBot: true, message: this.questionLists[0]});
    this.chatList.push({fromBot: true, loader: true});
  }

  /**
   * 
   * @param email 
   * @returns 
   */
  validateEmail(email: string) {
    var emailsArray = email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    if (emailsArray != null && emailsArray.length) {
        //has email
        return emailsArray[0];
    } else {
      return false
    }
  }

  /**
   * 
   * @param event 
   */
  public onKeyDownEvent(event: any) {
    console.log('form submitted');
    this.chatList.push({fromBot: false, message: this.inputText});
    switch (this.currentQuestionIndex) {
      case 0:
          if (this.validateEmail(this.inputText)) {
            this.chatList.push({fromBot: true, message: 'Cool ! got your email. \n' + this.validateEmail(this.inputText)});
            this.currentQuestionIndex = this.currentQuestionIndex + 1;
            this.chatList.push({fromBot: true, message: this.questionLists[this.currentQuestionIndex]});
          } else {
            this.chatList.push({fromBot: true, message: 'Please enter valid email '});
          }
        break;

      case 1:
        if (this.inputText == '12345678') {
          this.chatList.push({fromBot: true, message: 'Login success '});
          this.currentQuestionIndex = this.currentQuestionIndex + 1;
        } else {
          this.chatList.push({fromBot: true, message: 'Invalid password'});
        }
      break;
    
      default:
        break;
    }
    const container = this.scrollContainer.nativeElement;
    console.log(container.scrollHeight)
    container.scrollTop = container.scrollHeight + 50000;
    this.inputText = '';
  }
}