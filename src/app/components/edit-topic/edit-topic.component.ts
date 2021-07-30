import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Course } from 'src/app/models/course';
import { Topic } from 'src/app/models/topic';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { RestTopicService } from 'src/app/services/restTopic/rest-topic.service';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent implements OnInit {

  public user: User;
  public course: Course;
  public topic: Topic;
  public uri: string;
  public possiblePass;
  token: string;
  topicSelect: Topic;

  constructor(private restUser:RestUserService, private restCourse:RestCourseService, private restTopic:RestTopicService, private route: Router) { 
    this.uri = CONNECTION.URI;
    this.user = this.restUser.getUser();
    this.topic = this.restTopic.getTopicSelect();
    this.course = this.restCourse.getCourseStorage();
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.restTopic.updateTopic(this.user, this.course, this.topic).subscribe((res:any) => {
      if(res.topicUpdated){
        localStorage.setItem('topicSelect', JSON.stringify(res.topicUpdated))
        alert(res.message);
      }else{
        alert(res.message);
        this.topic = this.restTopic.getTopicSelect();
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  deleteTopic(){
    this.restTopic.deleteTopic(this.user, this.course, this.topic, this.possiblePass).subscribe((res:any) => {
      if(res.topicDelete){
        alert(res.message);
        localStorage.removeItem('topicSelect');
        this.route.navigateByUrl('listTopics');
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

}
