# 🔗 n8n LinkedIn Job Search Automation
### Intelligent Workflow Automation for Job Discovery & Application Tracking

<div align="center">

![n8n Automation](https://img.shields.io/badge/n8n-Workflow%20Automation-FF6D5A?style=for-the-badge&logo=n8n)
![LinkedIn API](https://img.shields.io/badge/LinkedIn-API%20Integration-0077B5?style=for-the-badge&logo=linkedin)
![Webhooks](https://img.shields.io/badge/Webhooks-Real--time-green?style=for-the-badge&logo=webhook)
![Automation](https://img.shields.io/badge/Automation-24/7-blue?style=for-the-badge&logo=automate)

*Streamline your job search with intelligent automation and real-time notifications*

[🚀 Live Demo](https://demo.n8n-jobs.com) • [📖 Setup Guide](https://docs.n8n-jobs.com) • [🎥 Tutorial](https://youtube.com/watch?v=demo)

</div>

## 🌟 Overview

This project leverages n8n's powerful workflow automation platform to create an intelligent job search system that monitors LinkedIn for relevant opportunities, filters them based on your criteria, and automatically manages your job application pipeline. Say goodbye to manual job hunting and hello to efficient, automated career development.

### ✨ Key Features

- **📊 Smart Job Discovery** - Automated LinkedIn job search with custom filters
- **🔍 Intelligent Filtering** - AI-powered job matching based on your preferences
- **📧 Real-time Notifications** - Instant alerts for new matching opportunities
- **📈 Application Tracking** - Complete pipeline management and analytics
- **🤖 Auto-Application** - Automated job applications for perfect matches
- **📋 CRM Integration** - Sync with popular CRM and tracking systems
- **📊 Analytics Dashboard** - Comprehensive job market insights and trends
- **🔄 Multi-platform Support** - Expand beyond LinkedIn to other job boards

## 🏗️ Workflow Architecture

```mermaid
graph TD
    A[Scheduled Trigger] --> B[LinkedIn Job Search]
    B --> C[Job Data Extraction]
    C --> D[AI-Powered Filtering]
    D --> E{Matches Criteria?}
    E -->|Yes| F[Add to Pipeline]
    E -->|No| G[Discard Job]
    F --> H[Send Notification]
    F --> I[Update Tracking Sheet]
    F --> J[Auto-Apply Logic]
    J --> K{Auto-Apply Enabled?}
    K -->|Yes| L[Submit Application]
    K -->|No| M[Queue for Review]
    L --> N[Log Application]
    M --> O[Send Review Alert]
    H --> P[Slack/Email/Discord]
    I --> Q[Google Sheets/Airtable]
    N --> R[Analytics Database]
```

### 🔧 Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Automation Platform** | n8n | Visual workflow automation and orchestration |
| **Job Search API** | LinkedIn API | Job listing retrieval and search |
| **AI Processing** | OpenAI GPT-4 | Intelligent job matching and filtering |
| **Notifications** | Slack, Discord, Email | Real-time job alerts and updates |
| **Data Storage** | Google Sheets, Airtable | Job tracking and application management |
| **Webhooks** | Custom endpoints | Real-time data synchronization |
| **Analytics** | Google Analytics, Mixpanel | Performance tracking and insights |
| **CRM Integration** | HubSpot, Salesforce | Professional relationship management |

## 🚀 Quick Start

### Prerequisites

```bash
n8n >= 1.0.0
Node.js >= 18.0.0
Docker (optional)
LinkedIn API Access
OpenAI API Key (for AI filtering)
```

### Installation Methods

#### Method 1: n8n Cloud (Recommended)

1. **Sign up for n8n Cloud**
   - Visit [n8n.cloud](https://n8n.cloud) and create an account
   - Choose a plan that supports the required integrations

2. **Import the workflow**
   ```bash
   # Download the workflow file
   curl -O https://raw.githubusercontent.com/chiragkhachane/n8n-linkedin-job-search/main/workflows/linkedin-job-automation.json
   
   # Import into n8n Cloud via the UI
   ```

#### Method 2: Self-hosted n8n

1. **Clone the repository**
   ```bash
   git clone https://github.com/chiragkhachane/n8n-linkedin-job-search.git
   cd n8n-linkedin-job-search
   ```

2. **Start n8n with Docker**
   ```bash
   # Using Docker Compose
   docker-compose up -d
   
   # Or using npm
   npm install n8n -g
   n8n start
   ```

3. **Access n8n interface**
   ```
   Open http://localhost:5678
   ```

### 📋 Configuration Setup

#### Environment Variables

```bash
# Create .env file
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=your_username
N8N_BASIC_AUTH_PASSWORD=your_password

# API Keys
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
OPENAI_API_KEY=sk-your-openai-api-key
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token

# Webhook URLs
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook
WEBHOOK_SECRET=your_webhook_secret

# Database (if using custom storage)
DATABASE_URL=postgresql://user:password@localhost:5432/jobsearch
```

#### LinkedIn API Setup

1. **Create LinkedIn App**
   ```bash
   # Visit LinkedIn Developer Portal
   https://developer.linkedin.com/
   
   # Create new app with permissions:
   # - r_liteprofile
   # - r_emailaddress
   # - w_member_social
   ```

2. **Configure OAuth Redirect**
   ```
   Redirect URL: https://your-n8n-instance.com/rest/oauth2-credential/callback
   ```

## 🔧 Workflow Components

### 1. Job Search Trigger

```json
{
  "name": "Schedule Trigger",
  "type": "n8n-nodes-base.scheduleTrigger",
  "parameters": {
    "rule": {
      "interval": [
        {
          "field": "hours",
          "value": 2
        }
      ]
    }
  },
  "position": [250, 300]
}
```

### 2. LinkedIn Job Search Node

```json
{
  "name": "LinkedIn Job Search",
  "type": "n8n-nodes-base.linkedIn",
  "parameters": {
    "resource": "job",
    "operation": "search",
    "keywords": "{{$node['Job Criteria'].json['keywords']}}",
    "location": "{{$node['Job Criteria'].json['location']}}",
    "datePosted": "pastWeek",
    "experienceLevel": "{{$node['Job Criteria'].json['experienceLevel']}}",
    "jobType": "{{$node['Job Criteria'].json['jobType']}}",
    "limit": 50
  }
}
```

### 3. AI-Powered Job Filter

```json
{
  "name": "AI Job Filter",
  "type": "n8n-nodes-base.openAi",
  "parameters": {
    "resource": "text",
    "operation": "completion",
    "model": "gpt-4-turbo-preview",
    "prompt": "Analyze this job posting and rate it from 1-10 based on fit for a {{$node['User Profile'].json['role']}} with {{$node['User Profile'].json['experience']}} years of experience and skills in {{$node['User Profile'].json['skills']}}.\n\nJob Title: {{$json['title']}}\nCompany: {{$json['company']}}\nDescription: {{$json['description']}}\n\nProvide rating and brief explanation:",
    "maxTokens": 200,
    "temperature": 0.3
  }
}
```

### 4. Notification System

```json
{
  "name": "Slack Notification",
  "type": "n8n-nodes-base.slack",
  "parameters": {
    "resource": "message",
    "operation": "post",
    "channel": "#job-alerts",
    "text": "🚀 New Job Match Found!\n\n*{{$json['title']}}* at *{{$json['company']}}*\n📍 {{$json['location']}}\n💰 {{$json['salary']}}\n⭐ AI Match Score: {{$json['matchScore']}}/10\n\n🔗 Apply: {{$json['applyUrl']}}",
    "attachments": []
  }
}
```

## 📊 Advanced Filtering Logic

### Custom Job Scoring Algorithm

```javascript
// Custom Function Node - Job Scoring
const jobData = $input.all();
const userProfile = $('User Profile').first().json;

function calculateJobScore(job, profile) {
  let score = 0;
  
  // Title matching
  const titleKeywords = profile.preferredTitles || [];
  const titleMatch = titleKeywords.some(keyword => 
    job.title.toLowerCase().includes(keyword.toLowerCase())
  );
  if (titleMatch) score += 30;
  
  // Skills matching
  const requiredSkills = extractSkills(job.description);
  const userSkills = profile.skills || [];
  const skillsMatch = requiredSkills.filter(skill => 
    userSkills.some(userSkill => 
      userSkill.toLowerCase().includes(skill.toLowerCase())
    )
  ).length;
  score += (skillsMatch / requiredSkills.length) * 40;
  
  // Experience level
  const requiredExperience = extractExperienceLevel(job.description);
  const experienceDiff = Math.abs(profile.yearsExperience - requiredExperience);
  if (experienceDiff <= 2) score += 20;
  else score += Math.max(0, 20 - (experienceDiff * 5));
  
  // Company preferences
  if (profile.preferredCompanies && 
      profile.preferredCompanies.includes(job.company)) {
    score += 10;
  }
  
  return Math.min(100, score);
}

return jobData.map(job => ({
  ...job.json,
  matchScore: calculateJobScore(job.json, userProfile),
  processed: true,
  timestamp: new Date().toISOString()
}));
```

### Salary Analysis

```javascript
// Salary Range Analyzer
function analyzeSalary(job, profile) {
  const salaryRange = extractSalaryRange(job.description);
  const expectedSalary = profile.expectedSalary;
  
  if (!salaryRange || !expectedSalary) return null;
  
  const analysis = {
    minSalary: salaryRange.min,
    maxSalary: salaryRange.max,
    expectedSalary: expectedSalary,
    meetsMinimum: salaryRange.min >= expectedSalary * 0.8,
    exceedsExpectation: salaryRange.max >= expectedSalary * 1.2,
    percentageDifference: ((salaryRange.max - expectedSalary) / expectedSalary) * 100
  };
  
  return analysis;
}
```

## 📱 Integration Options

### Google Sheets Integration

```json
{
  "name": "Add to Job Tracker",
  "type": "n8n-nodes-base.googleSheets",
  "parameters": {
    "operation": "append",
    "documentId": "{{$node['Config'].json['sheetId']}}",
    "sheetName": "Job Applications",
    "values": {
      "Date": "={{new Date().toLocaleDateString()}}",
      "Company": "={{$json['company']}}",
      "Position": "={{$json['title']}}",
      "Location": "={{$json['location']}}",
      "Salary": "={{$json['salary']}}",
      "Match Score": "={{$json['matchScore']}}",
      "Status": "New",
      "Apply URL": "={{$json['applyUrl']}}",
      "Notes": "={{$json['aiAnalysis']}}"
    }
  }
}
```

### Airtable CRM Integration

```json
{
  "name": "Create Airtable Record",
  "type": "n8n-nodes-base.airtable",
  "parameters": {
    "operation": "create",
    "application": "{{$node['Config'].json['airtableAppId']}}",
    "table": "Job Pipeline",
    "fields": {
      "Company": "={{$json['company']}}",
      "Position": "={{$json['title']}}",
      "Status": "To Apply",
      "Match Score": "={{$json['matchScore']}}",
      "Date Found": "={{new Date().toISOString()}}",
      "LinkedIn URL": "={{$json['jobUrl']}}",
      "AI Analysis": "={{$json['aiSummary']}}"
    }
  }
}
```

### Discord Bot Integration

```json
{
  "name": "Discord Alert",
  "type": "n8n-nodes-base.discord",
  "parameters": {
    "resource": "message",
    "operation": "post",
    "channelId": "{{$node['Config'].json['discordChannelId']}}",
    "content": "",
    "embeds": [
      {
        "title": "{{$json['title']}} - {{$json['company']}}",
        "description": "{{$json['shortDescription']}}",
        "color": 3066993,
        "fields": [
          {
            "name": "📍 Location",
            "value": "{{$json['location']}}",
            "inline": true
          },
          {
            "name": "⭐ Match Score",
            "value": "{{$json['matchScore']}}/100",
            "inline": true
          },
          {
            "name": "💰 Salary",
            "value": "{{$json['salary'] || 'Not specified'}}",
            "inline": true
          }
        ],
        "url": "{{$json['applyUrl']}}"
      }
    ]
  }
}
```

## 🤖 Auto-Application Features

### Resume Customization

```javascript
// Custom Resume Builder
function customizeResume(job, baseResume, profile) {
  const jobKeywords = extractKeywords(job.description);
  const customizedResume = {
    ...baseResume,
    summary: enhanceSummary(baseResume.summary, jobKeywords),
    skills: prioritizeSkills(baseResume.skills, jobKeywords),
    experience: highlightRelevantExperience(baseResume.experience, job)
  };
  
  return customizedResume;
}

function generateCoverLetter(job, profile) {
  const template = profile.coverLetterTemplate;
  return template
    .replace('{{COMPANY}}', job.company)
    .replace('{{POSITION}}', job.title)
    .replace('{{KEY_SKILLS}}', getRelevantSkills(job, profile).join(', '))
    .replace('{{EXPERIENCE}}', profile.relevantExperience);
}
```

### Application Submission

```json
{
  "name": "Auto Submit Application",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "POST",
    "url": "={{$json['applicationApiUrl']}}",
    "authentication": "headerAuth",
    "headerAuth": {
      "name": "Authorization",
      "value": "Bearer {{$node['LinkedIn Auth'].json['accessToken']}}"
    },
    "body": {
      "resumeUrl": "={{$json['customizedResumeUrl']}}",
      "coverLetter": "={{$json['generatedCoverLetter']}}",
      "additionalInfo": "={{$json['applicationNotes']}}"
    }
  },
  "options": {}
}
```

## 📊 Analytics & Reporting

### Job Market Analytics

```javascript
// Market Trends Analysis
function analyzeJobMarket(jobs, timeframe) {
  const analysis = {
    totalJobs: jobs.length,
    averageMatchScore: calculateAverage(jobs.map(j => j.matchScore)),
    topCompanies: getTopCompanies(jobs, 10),
    salaryTrends: analyzeSalaryTrends(jobs),
    skillsDemand: analyzeSkillsDemand(jobs),
    locationTrends: analyzeLocationTrends(jobs),
    industryBreakdown: analyzeIndustries(jobs)
  };
  
  return analysis;
}

// Generate Weekly Report
function generateWeeklyReport(analytics) {
  return {
    title: `Job Market Report - Week of ${new Date().toLocaleDateString()}`,
    summary: `Found ${analytics.totalJobs} relevant positions with an average match score of ${analytics.averageMatchScore.toFixed(1)}/100`,
    topOpportunities: analytics.jobs.filter(j => j.matchScore >= 80),
    marketInsights: analytics.trends,
    recommendations: generateRecommendations(analytics)
  };
}
```

### Performance Dashboard

```json
{
  "name": "Update Analytics Dashboard",
  "type": "n8n-nodes-base.googleSheets",
  "parameters": {
    "operation": "update",
    "documentId": "{{$node['Config'].json['analyticsSheetId']}}",
    "sheetName": "Dashboard",
    "range": "A2:J2",
    "values": [
      [
        "={{new Date().toLocaleDateString()}}",
        "={{$json['totalJobsFound']}}",
        "={{$json['highMatchJobs']}}",
        "={{$json['applicationsSubmitted']}}",
        "={{$json['averageMatchScore']}}",
        "={{$json['topCompany']}}",
        "={{$json['averageSalary']}}",
        "={{$json['responseRate']}}",
        "={{$json['interviewRequests']}}",
        "={{$json['jobOffers']}}"
      ]
    ]
  }
}
```

## 🚀 Deployment Options

### n8n Cloud Deployment

```bash
# Export workflow
n8n export:workflow --output=./workflows/

# Import to n8n Cloud
# 1. Login to n8n Cloud dashboard
# 2. Import workflow JSON file
# 3. Configure credentials and webhooks
# 4. Activate workflow
```

### Self-hosted Docker Deployment

```yaml
# docker-compose.yml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${N8N_USER}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - N8N_HOST=${N8N_HOST}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=${N8N_HOST}
      - GENERIC_TIMEZONE=${TIMEZONE}
    volumes:
      - n8n_data:/home/node/.n8n
      - ./workflows:/home/node/.n8n/workflows
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:13
    restart: always
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6-alpine
    restart: always

volumes:
  n8n_data:
  postgres_data:
```

### Kubernetes Deployment

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: n8n-linkedin-automation
spec:
  replicas: 1
  selector:
    matchLabels:
      app: n8n-linkedin-automation
  template:
    metadata:
      labels:
        app: n8n-linkedin-automation
    spec:
      containers:
      - name: n8n
        image: n8nio/n8n:latest
        ports:
        - containerPort: 5678
        env:
        - name: N8N_BASIC_AUTH_ACTIVE
          value: "true"
        - name: DB_TYPE
          value: postgresdb
        - name: DB_POSTGRESDB_HOST
          value: postgres-service
        volumeMounts:
        - name: n8n-data
          mountPath: /home/node/.n8n
        resources:
          limits:
            memory: "1Gi"
            cpu: "500m"
          requests:
            memory: "512Mi"
            cpu: "250m"
      volumes:
      - name: n8n-data
        persistentVolumeClaim:
          claimName: n8n-pvc
```

## 🔧 Customization Guide

### Adding New Job Boards

```json
{
  "name": "Indeed Job Search",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "GET",
    "url": "https://api.indeed.com/ads/apisearch",
    "qs": {
      "publisher": "{{$node['Config'].json['indeedApiKey']}}",
      "q": "={{$node['Job Criteria'].json['keywords']}}",
      "l": "={{$node['Job Criteria'].json['location']}}",
      "sort": "date",
      "radius": "25",
      "st": "jobsite",
      "jt": "fulltime",
      "start": "0",
      "limit": "25",
      "fromage": "7",
      "format": "json",
      "v": "2"
    }
  }
}
```

### Custom Notification Channels

```javascript
// Custom Notification Function
function sendCustomNotification(job, channel) {
  const notifications = {
    email: () => sendEmail(job),
    sms: () => sendSMS(job),
    teams: () => sendTeamsMessage(job),
    telegram: () => sendTelegramMessage(job),
    webhook: () => callCustomWebhook(job)
  };
  
  if (notifications[channel]) {
    return notifications[channel]();
  }
}

function sendTelegramMessage(job) {
  return {
    method: 'POST',
    url: `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    json: {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: formatTelegramMessage(job),
      parse_mode: 'Markdown'
    }
  };
}
```

## 📚 Use Cases & Examples

### 1. Fresh Graduate Job Search

```json
{
  "userProfile": {
    "role": "Software Developer",
    "experience": 0,
    "skills": ["JavaScript", "React", "Node.js", "Python"],
    "preferredTitles": ["Junior Developer", "Entry Level", "Graduate"],
    "location": "San Francisco",
    "expectedSalary": 70000,
    "autoApply": false
  },
  "searchCriteria": {
    "keywords": "junior software developer OR entry level developer",
    "experienceLevel": "entry",
    "datePosted": "pastWeek",
    "jobType": "fullTime"
  }
}
```

### 2. Senior Developer Transition

```json
{
  "userProfile": {
    "role": "Senior Software Engineer",
    "experience": 8,
    "skills": ["Python", "AWS", "Kubernetes", "Machine Learning"],
    "preferredTitles": ["Tech Lead", "Principal Engineer", "Architect"],
    "location": "Remote",
    "expectedSalary": 150000,
    "autoApply": true
  },
  "advancedFilters": {
    "companySize": ["1000+"],
    "fundingStage": ["Series B", "Series C", "Public"],
    "techStack": ["Python", "AWS", "Microservices"]
  }
}
```

### 3. Career Changer

```json
{
  "userProfile": {
    "role": "Product Manager",
    "experience": 3,
    "previousRole": "Software Developer",
    "skills": ["Agile", "Scrum", "Product Strategy", "Analytics"],
    "location": "New York",
    "expectedSalary": 120000,
    "careerChange": true
  },
  "transitionStrategy": {
    "highlightTransferableSkills": true,
    "emphasizeTechBackground": true,
    "lookForHybridRoles": true
  }
}
```

## 🧪 Testing & Validation

### Workflow Testing

```bash
# Test individual workflow nodes
n8n execute --workflow "LinkedIn Job Search" --input test-data.json

# Validate workflow syntax
n8n validate --workflow workflows/linkedin-job-automation.json

# Run integration tests
npm run test:integration
```

### Performance Testing

```javascript
// Load test configuration
const loadTest = {
  concurrent_users: 10,
  duration: '5m',
  job_search_frequency: '30s',
  expected_response_time: '< 2s',
  success_rate: '> 95%'
};

// Monitor key metrics
const metrics = [
  'workflow_execution_time',
  'api_response_time',
  'notification_delivery_rate',
  'error_rate',
  'memory_usage'
];
```

## 🔒 Security & Privacy

### Data Protection

```javascript
// Data sanitization
function sanitizeJobData(job) {
  return {
    ...job,
    // Remove sensitive information
    internalJobId: undefined,
    recruiterId: undefined,
    applicantCount: undefined,
    // Anonymize if needed
    company: job.anonymousPosting ? 'Confidential' : job.company
  };
}

// Secure credential storage
const credentials = {
  linkedin: {
    encrypted: true,
    storage: 'vault',
    rotationPeriod: '90d'
  },
  openai: {
    encrypted: true,
    storage: 'vault',
    rateLimiting: true
  }
};
```

### Compliance

```yaml
# GDPR Compliance
gdpr:
  data_retention: '30d'
  user_consent: required
  data_export: available
  data_deletion: automatic

# Rate Limiting
rate_limits:
  linkedin_api: '100_requests_per_hour'
  openai_api: '60_requests_per_minute'
  notifications: '10_per_hour'
```

## 📈 Roadmap

### Short-term (Q1 2024)
- [ ] **Additional Job Boards** - Indeed, Glassdoor, AngelList integration
- [ ] **Mobile App** - React Native app for job alerts
- [ ] **Advanced Filters** - Company culture, benefits, remote options
- [ ] **Interview Scheduler** - Calendar integration for interview management

### Medium-term (Q2-Q3 2024)
- [ ] **AI Cover Letters** - Automated, personalized cover letter generation
- [ ] **Salary Negotiation** - AI-powered salary negotiation assistant
- [ ] **Network Analysis** - LinkedIn connection mapping for referrals
- [ ] **Skills Gap Analysis** - Identify and recommend skill development

### Long-term (Q4 2024+)
- [ ] **Job Market Predictions** - ML-powered job market forecasting
- [ ] **Career Path Planning** - AI-driven career development roadmaps
- [ ] **Interview Preparation** - AI interview coach and practice sessions
- [ ] **Employer Insights** - Company culture and interview process insights

## 🤝 Contributing

We welcome contributions to make this automation even more powerful!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Areas for Contribution

- **New Integrations**: Additional job boards, CRM systems, notification channels
- **AI Improvements**: Better job matching algorithms, sentiment analysis
- **UI Enhancements**: Dashboard improvements, mobile app development
- **Documentation**: Tutorials, examples, troubleshooting guides

## 📞 Support & Community

- **Documentation**: [Complete Setup Guide](https://docs.n8n-jobs.com)
- **Community Forum**: [GitHub Discussions](https://github.com/chiragkhachane/n8n-linkedin-job-search/discussions)
- **Bug Reports**: [GitHub Issues](https://github.com/chiragkhachane/n8n-linkedin-job-search/issues)
- **n8n Community**: [Official n8n Forum](https://community.n8n.io)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **n8n.io** for the incredible automation platform
- **LinkedIn** for providing accessible APIs
- **OpenAI** for intelligent job matching capabilities
- **The automation community** for inspiration and best practices

---

<div align="center">

**Automate your way to career success** 🚀

[🌐 Try It Now](https://demo.n8n-jobs.com) • [📧 Contact](mailto:jobs@n8n-automation.com) • [🐦 Follow](https://twitter.com/n8n_jobs)

*Your next opportunity is just an automation away*

</div>