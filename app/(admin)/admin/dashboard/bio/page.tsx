"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Download, 
  Copy, 
  Check,
  BookOpen,
  Code,
  Briefcase,
  User,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { projectsApi } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { technologies } from "@/lib/data/technologies-data";
import { aboutMeContent } from "@/lib/data/about-data";
import { format } from "date-fns";

export default function BioDashboardPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    about: true,
    projects: false,
    technologies: false
  });

  // Query to fetch projects
  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: projectsApi.getAllProjects,
  });

  // Generate full bio text
  const generateBioText = () => {
    let bioText = "# Professional Bio\n\n";
    
    // About Me Section
    bioText += "## About Me\n\n";
    bioText += `${aboutMeContent.headline}\n\n`;
    bioText += `${aboutMeContent.summary}\n\n`;
    bioText += `${aboutMeContent.experience}\n\n`;
    
    bioText += "### Key Projects Delivered:\n\n";
    aboutMeContent.keyProjects.forEach(project => {
      bioText += `- ${project}\n`;
    });
    bioText += "\n";
    bioText += `${aboutMeContent.conclusion}\n\n`;
    
    // Technologies Section
    bioText += "## Technologies & Skills\n\n";
    
    Object.entries(technologies).forEach(([category, techs]) => {
      bioText += `### ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
      techs.forEach(tech => {
        bioText += `- ${tech.name}${tech.description ? ` - ${tech.description}` : ''}\n`;
      });
      bioText += "\n";
    });
    
    // Projects Section
    if (projects && projects.length > 0) {
      bioText += "## Projects\n\n";
      
      projects.forEach((project, index) => {
        bioText += `### ${project.title}\n`;
        bioText += `${project.description}\n\n`;
        
        bioText += `**Category:** ${project.category}\n`;
        bioText += `**Technologies:** ${project.tags.join(", ")}\n`;
        
        if (project.liveUrl && !project.isPrivate) {
          bioText += `**Live Demo:** ${project.liveUrl}\n`;
        }
        
        if (project.githubUrl && !project.isPrivate) {
          bioText += `**GitHub:** ${project.githubUrl}\n`;
        }
        
        if (project.detailedContent) {
          bioText += "\nDetailed Description:\n";
          bioText += project.detailedContent + "\n";
        }
        
        if (index < projects.length - 1) {
          bioText += "\n---\n\n";
        }
      });
    }
    
    // Current date
    bioText += `\n\nLast updated: ${format(new Date(), "MMMM d, yyyy")}\n`;
    
    return bioText;
  };

  const bioText = generateBioText();

  // Copy text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(bioText);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Bio content has been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Download as text file
  const downloadAsFile = () => {
    const blob = new Blob([bioText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-bio-${format(new Date(), "yyyy-MM-dd")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "File downloaded",
      description: "Bio content has been downloaded as a Markdown file",
    });
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" asChild>
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </>
            )}
          </Button>
          <Button onClick={downloadAsFile}>
            <Download className="h-4 w-4 mr-2" />
            Download as MD
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Interactive sections */}
        <div className="lg:col-span-1 space-y-6">
          {/* About Me Section */}
          <Card>
            <CardHeader 
              className="flex flex-row items-center justify-between cursor-pointer"
              onClick={() => toggleSection("about")}
            >
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                About Me
              </CardTitle>
              {expandedSections.about ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </CardHeader>
            {expandedSections.about && (
              <CardContent className="pt-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-1">Headline</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {aboutMeContent.headline}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Summary</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {aboutMeContent.summary}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Experience</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {aboutMeContent.experience}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Key Projects</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                      {aboutMeContent.keyProjects.map((project, index) => (
                        <li key={index}>{project}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Technologies Section */}
          <Card>
            <CardHeader 
              className="flex flex-row items-center justify-between cursor-pointer"
              onClick={() => toggleSection("technologies")}
            >
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Technologies ({Object.keys(technologies).length} categories)
              </CardTitle>
              {expandedSections.technologies ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </CardHeader>
            {expandedSections.technologies && (
              <CardContent className="pt-2">
                <Tabs defaultValue="frontend">
                  <TabsList className="mb-4 flex flex-wrap">
                    {Object.keys(technologies).map((category) => (
                      <TabsTrigger key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {Object.entries(technologies).map(([category, techs]) => (
                    <TabsContent key={category} value={category}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {techs.map((tech, index) => (
                          <div key={index} className="flex items-start p-2 border rounded-lg">
                            <div>
                              <div className="font-medium">{tech.name}</div>
                              {tech.description && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {tech.description}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            )}
          </Card>

          {/* Projects Section */}
          <Card>
            <CardHeader 
              className="flex flex-row items-center justify-between cursor-pointer"
              onClick={() => toggleSection("projects")}
            >
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Projects {projects ? `(${projects.length})` : ''}
              </CardTitle>
              {expandedSections.projects ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </CardHeader>
            {expandedSections.projects && (
              <CardContent className="pt-2">
                {isLoadingProjects ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border rounded-lg p-4 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    ))}
                  </div>
                ) : projects && projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No projects found
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>

        {/* Right column - Preview */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Bio Text for LLMs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={bioText} 
                className="font-mono text-sm h-[800px] resize-none" 
                readOnly
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 