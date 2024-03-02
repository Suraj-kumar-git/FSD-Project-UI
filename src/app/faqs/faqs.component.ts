import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent {
  @Input()
  faqs = [
    {
      question: 'What are the eligibility criteria for a loan?',
      answer: 'The eligibility criteria for a loan vary depending on the type of loan. However, common factors include age, income, credit score, and employment status.'
    },
    {
      question: 'How can I improve my chances of getting a loan?',
      answer: 'To improve your chances of getting a loan, you can maintain a good credit score, have a stable income, and keep your debt-to-income ratio low.'
    },
    // Add more questions and answers here
    {
      question: 'What happens if I miss a loan payment?',
      answer: 'If you miss a loan payment, you may incur late fees and your credit score may be negatively affected. It\'s important to contact your lender immediately if you\'re having trouble making payments.'
    }
  ];
}
