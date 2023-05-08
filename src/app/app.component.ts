import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export class Resume {
  name: string;
  address: string;
  contactNo: number;
  email: string;
  skills: Skill[] = [];

  constructor() {
    this.skills.push(new Skill());
  }
}
//skill export
export class Skill {
  value: string;
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('Print', { static: false }) el!: ElementRef;
  name = 'Angular ' + VERSION.major;

  resume = new Resume();

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();

    //skills
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }
  }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open':
        pdfMake.createPdf(this.el.nativeElement).open();
        break;
      case 'print':
        pdfMake.createPdf(documentDefinition).print();
        break;
      case 'download':
        pdfMake.createPdf(this.el.nativeElement).download();
        break;

      default:
        pdfMake.createPdf(this.el.nativeElement).open();
        break;
    }
  }

  addSkill() {
    this.resume.skills.push(new Skill());
  }

  resetForm() {
    this.resume = new Resume();
  }

  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        {
          columns: [
            // Add the profile image to the left column
            {
              image:
                'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',
              width: 75,
              height: 75,
              margin: [0, 0, 10, 0],
            },
            // Add the name and job title to the right column
            {
              stack: [
                { text: 'John Doe', style: 'header' },
                { text: 'Software Developer', style: 'subheader' },
              ],
            },
          ],
        },
        { text: 'Contact Information', style: 'sectionHeader' },
        { text: 'Email: john.doe@email.com', margin: [0, 0, 0, 5] },
        { text: 'Phone: 123-456-7890', margin: [0, 0, 0, 10] },
        { text: 'Summary', style: 'sectionHeader' },
        {
          text: 'Experienced software developer with a strong background in web development and programming languages such as JavaScript and Python.',
          margin: [0, 0, 0, 10],
        },
        { text: 'Skills', style: 'sectionHeader' },
        {
          ul: ['JavaScript', 'Python', 'HTML/CSS', 'React', 'Node.js'],
          margin: [0, 0, 0, 10],
        },
        { text: 'Work Experience', style: 'sectionHeader' },
        {
          text: 'Software Developer',
          bold: true,
          margin: [0, 0, 0, 5],
        },
        {
          text: 'ABC Company',
          margin: [0, 0, 0, 10],
        },
        {
          ul: [
            'Developed and maintained web applications using React and Node.js',
            'Collaborated with cross-functional teams to deliver high-quality software products',
            'Implemented automated testing processes to ensure code quality and reliability',
          ],
        },
        { text: 'Education', style: 'sectionHeader' },
        {
          text: 'Bachelor of Science in Computer Science',
          bold: true,
          margin: [0, 0, 0, 5],
        },
        {
          text: 'XYZ University',
          margin: [0, 0, 0, 10],
        },
        {
          text: 'Graduated with Honors',
        },
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          margin: [0, 0, 0, 5],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        sectionHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };
  }
}
