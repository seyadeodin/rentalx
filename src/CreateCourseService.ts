interface ICourse {
  name: string;
  duration?: number;
  educator: string;
}

class CreateCourseService {
  execute({ duration = 8, educator, name }: ICourse) {
    console.log(name, duration, educator);
  }
}

export default new CreateCourseService();
