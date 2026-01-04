import { Document, Collaborator } from "@/types/document";

export const mockCollaborators: Collaborator[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    color: "green",
    isOnline: true,
  },
  {
    id: "2",
    name: "Alex Johnson",
    email: "alex@example.com",
    color: "blue",
    isOnline: true,
  },
  {
    id: "3",
    name: "Maria Garcia",
    email: "maria@example.com",
    color: "purple",
    isOnline: false,
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@example.com",
    color: "orange",
    isOnline: true,
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma@example.com",
    color: "pink",
    isOnline: false,
  },
];

export const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Q4 Marketing Strategy",
    content: `<h1>Q4 Marketing Strategy 2024</h1>
<p>This document outlines our comprehensive marketing strategy for the fourth quarter. We'll focus on three key areas: brand awareness, customer acquisition, and retention campaigns.</p>
<h2>Key Objectives</h2>
<ul>
<li>Increase brand visibility by 40%</li>
<li>Launch 3 new product campaigns</li>
<li>Improve customer engagement metrics</li>
</ul>
<p>Our team has identified several growth opportunities that we'll explore in detail below...</p>`,
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    ownerId: "1",
    collaborators: [mockCollaborators[0], mockCollaborators[1], mockCollaborators[3]],
  },
  {
    id: "2",
    title: "Product Roadmap 2024",
    content: `<h1>Product Roadmap</h1>
<p>A comprehensive overview of our product development timeline and feature releases planned for this year.</p>
<h2>Phase 1: Foundation (Q1)</h2>
<p>Building the core infrastructure and establishing the baseline for future development...</p>`,
    createdAt: new Date(2024, 1, 1),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    ownerId: "2",
    collaborators: [mockCollaborators[1], mockCollaborators[2]],
  },
  {
    id: "3",
    title: "Team Meeting Notes - Weekly Sync",
    content: `<h1>Weekly Team Sync</h1>
<p><strong>Date:</strong> January 10, 2024</p>
<p><strong>Attendees:</strong> Full team</p>
<h2>Discussion Points</h2>
<ol>
<li>Project status updates</li>
<li>Blockers and dependencies</li>
<li>Action items for next week</li>
</ol>`,
    createdAt: new Date(2024, 0, 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    ownerId: "1",
    collaborators: [mockCollaborators[0], mockCollaborators[2], mockCollaborators[4]],
  },
  {
    id: "4",
    title: "Design System Documentation",
    content: `<h1>Design System Guidelines</h1>
<p>This document serves as the single source of truth for our design system, including components, colors, typography, and usage patterns.</p>
<h2>Core Principles</h2>
<p>Our design system is built on the following principles: consistency, accessibility, and scalability...</p>`,
    createdAt: new Date(2023, 11, 20),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    ownerId: "3",
    collaborators: [mockCollaborators[2], mockCollaborators[3]],
  },
  {
    id: "5",
    title: "API Integration Guide",
    content: `<h1>API Integration Guide</h1>
<p>Technical documentation for integrating with our REST API endpoints.</p>
<h2>Authentication</h2>
<p>All API requests require authentication using Bearer tokens...</p>
<pre><code>Authorization: Bearer your-api-token</code></pre>`,
    createdAt: new Date(2023, 10, 15),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    ownerId: "2",
    collaborators: [mockCollaborators[1]],
  },
  {
    id: "6",
    title: "User Research Findings",
    content: `<h1>User Research Report</h1>
<p>Summary of findings from our latest round of user interviews and usability testing sessions.</p>
<h2>Key Insights</h2>
<p>Users consistently mentioned the need for better collaboration features...</p>`,
    createdAt: new Date(2023, 9, 1),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 168), // 1 week ago
    ownerId: "4",
    collaborators: [mockCollaborators[0], mockCollaborators[4]],
  },
];
