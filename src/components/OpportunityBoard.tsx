import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  GraduationCap,
  DollarSign,
  MapPin,
  Clock,
  ExternalLink,
  Heart,
  Filter,
  Search,
  Building,
} from "lucide-react";

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "job" | "internship" | "scholarship";
  category: string;
  description: string;
  requirements: string[];
  salary?: string;
  deadline: string;
  postedDate: string;
  isRemote: boolean;
  experienceLevel: "entry" | "mid" | "senior";
  isSaved: boolean;
  applicationUrl: string;
}

const OpportunityBoard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");

  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: "1",
      title: "Frontend Developer Intern",
      company: "TechStart Inc.",
      location: "San Francisco, CA",
      type: "internship",
      category: "Software Development",
      description:
        "Join our dynamic team to build cutting-edge web applications using React, TypeScript, and modern development practices. Perfect opportunity for students looking to gain real-world experience.",
      requirements: ["React", "JavaScript", "HTML/CSS", "Git"],
      salary: "$25/hour",
      deadline: "2024-01-15",
      postedDate: "2023-12-01",
      isRemote: false,
      experienceLevel: "entry",
      isSaved: false,
      applicationUrl: "https://techstart.com/careers/frontend-intern",
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "InnovateCorp",
      location: "Remote",
      type: "job",
      category: "Software Development",
      description:
        "We're looking for a passionate full-stack developer to join our growing team. You'll work on exciting projects using Node.js, React, and cloud technologies.",
      requirements: [
        "Node.js",
        "React",
        "MongoDB",
        "AWS",
        "2+ years experience",
      ],
      salary: "$80,000 - $100,000",
      deadline: "2024-01-30",
      postedDate: "2023-11-28",
      isRemote: true,
      experienceLevel: "mid",
      isSaved: true,
      applicationUrl: "https://innovatecorp.com/jobs/fullstack-dev",
    },
    {
      id: "3",
      title: "Tech Excellence Scholarship",
      company: "Future Leaders Foundation",
      location: "National",
      type: "scholarship",
      category: "Education",
      description:
        "$10,000 scholarship for outstanding students pursuing computer science or related fields. Open to undergraduate and graduate students with strong academic records.",
      requirements: [
        "3.5+ GPA",
        "Computer Science major",
        "Leadership experience",
      ],
      salary: "$10,000",
      deadline: "2024-02-28",
      postedDate: "2023-11-15",
      isRemote: true,
      experienceLevel: "entry",
      isSaved: false,
      applicationUrl: "https://futureleaders.org/scholarships/tech-excellence",
    },
    {
      id: "4",
      title: "Senior React Developer",
      company: "MegaTech Solutions",
      location: "New York, NY",
      type: "job",
      category: "Software Development",
      description:
        "Lead our frontend development team in building next-generation applications. Looking for an experienced React developer with strong leadership skills.",
      requirements: [
        "React",
        "TypeScript",
        "Team Leadership",
        "5+ years experience",
      ],
      salary: "$120,000 - $150,000",
      deadline: "2024-01-20",
      postedDate: "2023-12-03",
      isRemote: false,
      experienceLevel: "senior",
      isSaved: false,
      applicationUrl: "https://megatech.com/careers/senior-react-dev",
    },
    {
      id: "5",
      title: "UX Design Internship",
      company: "Creative Studios",
      location: "Los Angeles, CA",
      type: "internship",
      category: "Design",
      description:
        "Gain hands-on experience in user experience design working on real client projects. Learn from industry experts and build your portfolio.",
      requirements: [
        "Figma",
        "Adobe Creative Suite",
        "Portfolio",
        "Design thinking",
      ],
      salary: "$20/hour",
      deadline: "2024-01-10",
      postedDate: "2023-11-30",
      isRemote: false,
      experienceLevel: "entry",
      isSaved: true,
      applicationUrl: "https://creativestudios.com/internships/ux-design",
    },
    {
      id: "6",
      title: "Women in Tech Scholarship",
      company: "Diversity in Tech Foundation",
      location: "National",
      type: "scholarship",
      category: "Education",
      description:
        "Supporting women pursuing careers in technology with a $5,000 scholarship. Includes mentorship opportunities and networking events.",
      requirements: [
        "Female identifying",
        "STEM field",
        "Financial need",
        "Essay submission",
      ],
      salary: "$5,000",
      deadline: "2024-03-15",
      postedDate: "2023-12-05",
      isRemote: true,
      experienceLevel: "entry",
      isSaved: false,
      applicationUrl: "https://diversityintech.org/scholarships/women-in-tech",
    },
  ]);

  const toggleSaved = (id: string) => {
    setOpportunities(
      opportunities.map((opp) =>
        opp.id === id ? { ...opp, isSaved: !opp.isSaved } : opp,
      ),
    );
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "all" ||
      (locationFilter === "remote" && opp.isRemote) ||
      opp.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesType = typeFilter === "all" || opp.type === typeFilter;
    const matchesExperience =
      experienceFilter === "all" || opp.experienceLevel === experienceFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "saved" && opp.isSaved) ||
      opp.type === activeTab;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesExperience &&
      matchesTab
    );
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "job":
        return <Briefcase className="h-4 w-4" />;
      case "internship":
        return <GraduationCap className="h-4 w-4" />;
      case "scholarship":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "job":
        return "bg-blue-100 text-blue-800";
      case "internship":
        return "bg-green-100 text-green-800";
      case "scholarship":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getExperienceColor = (level: string) => {
    switch (level) {
      case "entry":
        return "bg-green-100 text-green-800";
      case "mid":
        return "bg-yellow-100 text-yellow-800";
      case "senior":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Opportunity Board</h1>
        <p className="text-gray-600 mt-2">
          Discover jobs, internships, and scholarships tailored to your goals
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="san francisco">San Francisco</SelectItem>
                  <SelectItem value="new york">New York</SelectItem>
                  <SelectItem value="los angeles">Los Angeles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="job">Jobs</SelectItem>
                  <SelectItem value="internship">Internships</SelectItem>
                  <SelectItem value="scholarship">Scholarships</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience</label>
              <Select
                value={experienceFilter}
                onValueChange={setExperienceFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All levels</SelectItem>
                  <SelectItem value="entry">Entry level</SelectItem>
                  <SelectItem value="mid">Mid level</SelectItem>
                  <SelectItem value="senior">Senior level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="all">All ({opportunities.length})</TabsTrigger>
          <TabsTrigger value="job">
            Jobs ({opportunities.filter((o) => o.type === "job").length})
          </TabsTrigger>
          <TabsTrigger value="internship">
            Internships (
            {opportunities.filter((o) => o.type === "internship").length})
          </TabsTrigger>
          <TabsTrigger value="scholarship">
            Scholarships (
            {opportunities.filter((o) => o.type === "scholarship").length})
          </TabsTrigger>
          <TabsTrigger value="saved">
            Saved ({opportunities.filter((o) => o.isSaved).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredOpportunities.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">
                No opportunities found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOpportunities.map((opportunity) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getTypeIcon(opportunity.type)}
                            <Badge className={getTypeColor(opportunity.type)}>
                              {opportunity.type}
                            </Badge>
                            <Badge
                              className={getExperienceColor(
                                opportunity.experienceLevel,
                              )}
                            >
                              {opportunity.experienceLevel}
                            </Badge>
                            {opportunity.isRemote && (
                              <Badge variant="outline">Remote</Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg">
                            {opportunity.title}
                          </CardTitle>
                          <CardDescription className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-1" />
                              {opportunity.company}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {opportunity.location}
                            </div>
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSaved(opportunity.id)}
                          className={
                            opportunity.isSaved
                              ? "text-red-500"
                              : "text-gray-400"
                          }
                        >
                          <Heart
                            className={`h-4 w-4 ${opportunity.isSaved ? "fill-current" : ""}`}
                          />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {opportunity.description}
                      </p>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Requirements:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {opportunity.requirements
                              .slice(0, 4)
                              .map((req, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {req}
                                </Badge>
                              ))}
                            {opportunity.requirements.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{opportunity.requirements.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            {opportunity.salary && (
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                                <span className="font-medium">
                                  {opportunity.salary}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-gray-400" />
                              <span>
                                Due:{" "}
                                {new Date(
                                  opportunity.deadline,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button className="flex-1" asChild>
                            <a
                              href={opportunity.applicationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Apply Now
                              <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => toggleSaved(opportunity.id)}
                          >
                            {opportunity.isSaved ? "Saved" : "Save"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OpportunityBoard;
