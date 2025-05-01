export interface MedicalService {
  id: number;
  name: string;
  description: string;
  icon: string;
  detailedDescription?: string;
}

export const medicalServices: MedicalService[] = [
  {
    id: 1,
    name: "Symptom to Diagnosis",
    description: "Enter your symptoms and get possible diagnoses based on clinical data.",
    icon: "ri-mental-health-line",
    detailedDescription: "Our Symptom to Diagnosis service uses advanced algorithms to analyze your symptoms and provide potential diagnoses. Simply enter your symptoms, answer a few follow-up questions, and receive a list of possible conditions along with recommendations for next steps. This tool is designed to give you preliminary guidance, not to replace professional medical advice."
  },
  {
    id: 2,
    name: "Drug Interaction Checker",
    description: "Check for potential interactions between medications you're taking.",
    icon: "ri-medicine-bottle-line",
    detailedDescription: "The Drug Interaction Checker helps you understand how different medications might interact with each other. Enter all the medications you're currently taking, including over-the-counter drugs and supplements, and our system will identify potential interactions ranging from minor to severe. This information is crucial for preventing adverse drug reactions and ensuring your treatment plan is safe."
  },
  {
    id: 3,
    name: "Lab Test Recommendation",
    description: "Get personalized lab test recommendations based on your health profile.",
    icon: "ri-test-tube-line",
    detailedDescription: "Based on your symptoms, medical history, and current concerns, our Lab Test Recommendation service suggests appropriate laboratory tests that can help diagnose or monitor your condition. This service helps you and your healthcare provider make informed decisions about which tests are necessary, potentially saving time and reducing unnecessary testing."
  },
  {
    id: 4,
    name: "ICD-10 Code Finder",
    description: "Search and find the right diagnosis code for medical billing and records.",
    icon: "ri-file-list-3-line",
    detailedDescription: "Navigate the complex world of medical billing with our ICD-10 Code Finder. This tool helps healthcare professionals, administrators, and patients find the appropriate International Classification of Diseases (ICD-10) codes for diagnoses. Accurate coding is essential for proper insurance claims processing and maintaining precise medical records."
  },
  {
    id: 5,
    name: "Prescription Explanation (PDF)",
    description: "Upload your prescription PDF and get detailed explanations of medications.",
    icon: "ri-file-pdf-line",
    detailedDescription: "Understanding your prescription is crucial for effective treatment. With our Prescription Explanation service, you can upload a PDF of your prescription, and we'll provide clear, detailed information about each medication, including what it's for, how to take it, potential side effects, and important precautions. This helps ensure you're taking your medications correctly and safely."
  },
  {
    id: 6,
    name: "Specialist Referral Suggestion",
    description: "Get suggestions for specialists based on your condition and location.",
    icon: "ri-user-search-line",
    detailedDescription: "Finding the right specialist can be challenging. Our Specialist Referral Suggestion service recommends appropriate medical specialists based on your specific condition and location. We consider factors such as the nature of your health issue, urgency, and geographical proximity to help you find the most suitable healthcare provider for your needs."
  },
  {
    id: 7,
    name: "Heart Disease Risk Prediction",
    description: "Assess your risk of heart disease based on health metrics and lifestyle factors.",
    icon: "ri-heart-line",
    detailedDescription: "Our Heart Disease Risk Prediction tool uses validated clinical models to estimate your risk of developing cardiovascular disease. By analyzing factors such as age, blood pressure, cholesterol levels, smoking status, and family history, we provide a personalized risk assessment along with recommendations for lifestyle modifications and preventive measures to improve your heart health."
  },
  {
    id: 8,
    name: "Blood Test Report Analyzer",
    description: "Upload and analyze your blood test results with expert guidance.",
    icon: "ri-drop-line",
    detailedDescription: "Making sense of your blood test reports can be difficult. Our Blood Test Report Analyzer helps you understand what your results mean. Upload your lab report, and our system will interpret the values, highlight any abnormalities, explain their significance, and suggest possible next steps. This service bridges the gap between receiving your results and discussing them with your healthcare provider."
  },
  {
    id: 9,
    name: "Follow-up Advice Generator",
    description: "Receive personalized follow-up care recommendations after treatment.",
    icon: "ri-calendar-check-line",
    detailedDescription: "After receiving medical treatment, knowing how to properly follow up is essential for recovery. Our Follow-up Advice Generator provides customized recommendations for post-treatment care based on your specific condition, treatment received, and individual circumstances. This includes guidance on when to schedule follow-up appointments, warning signs to watch for, and self-care measures to promote healing."
  },
  {
    id: 10,
    name: "X-Ray Analyzer",
    description: "Upload X-ray images for preliminary analysis and guidance.",
    icon: "ri-scan-line",
    detailedDescription: "Our X-Ray Analyzer service provides preliminary interpretations of radiographic images. Upload your X-ray, and our advanced image processing algorithms will screen for common abnormalities and areas of potential concern. While this service is not a replacement for formal radiological interpretation, it can help provide initial insights and guide discussions with your healthcare provider."
  },
  {
    id: 11,
    name: "ECG Analyzer",
    description: "Upload ECG reports for preliminary interpretation and guidance.",
    icon: "ri-heart-pulse-line",
    detailedDescription: "The ECG Analyzer service helps you understand your electrocardiogram results. Upload your ECG report, and our system will analyze the heart rhythm and electrical patterns, checking for common abnormalities such as arrhythmias, conduction disorders, and signs of ischemia. This preliminary analysis can help you better understand your cardiac health and prepare questions for your healthcare provider."
  }
];

export const features: { id: number; title: string; description: string; icon: string }[] = [
  {
    id: 1,
    title: "Trusted Medical Experts",
    description: "Our platform connects you with verified healthcare professionals with years of experience.",
    icon: "ri-shield-check-line"
  },
  {
    id: 2,
    title: "Save Time & Effort",
    description: "Book appointments, access medical services, and get answers to your questions without leaving home.",
    icon: "ri-time-line"
  },
  {
    id: 3,
    title: "Secure & Private",
    description: "Your medical information is encrypted and protected according to the highest security standards.",
    icon: "ri-lock-line"
  },
  {
    id: 4,
    title: "24/7 Availability",
    description: "Access our AI-powered chat assistant anytime, day or night, for immediate medical guidance.",
    icon: "ri-24-hours-line"
  },
  {
    id: 5,
    title: "Affordable Options",
    description: "We offer various service levels to fit your budget without compromising on quality care.",
    icon: "ri-refund-2-line"
  },
  {
    id: 6,
    title: "Multi-Device Access",
    description: "Use our service on any device - desktop, tablet, or mobile phone - with a responsive interface.",
    icon: "ri-device-line"
  }
];

export const testimonials: { id: number; name: string; content: string; rating: number; image: string; since: string }[] = [
  {
    id: 1,
    name: "Sarah T.",
    content: "The appointment booking process was incredibly easy. I found a specialist, booked a time, and received great care - all without the usual hassle.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    since: "2022"
  },
  {
    id: 2,
    name: "David M.",
    content: "The drug interaction checker potentially saved me from a serious medication issue. The information was clear and helped me talk to my doctor about alternatives.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    since: "2021"
  },
  {
    id: 3,
    name: "Jennifer K.",
    content: "The chat assistant helped me understand my lab results before my appointment, so I was prepared with questions for my doctor. This service is invaluable!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    since: "2023"
  }
];
