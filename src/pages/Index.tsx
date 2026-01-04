import { useState } from "react";
import { Header } from "@/components/Header";
import { DocumentCard } from "@/components/DocumentCard";
import { DocumentEditor } from "@/components/DocumentEditor";
import { mockDocuments, mockCollaborators } from "@/data/mockData";
import { Document } from "@/types/document";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, Star, Users } from "lucide-react";

const Index = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleNewDocument = () => {
    const newDoc: Document = {
      id: String(Date.now()),
      title: "Untitled Document",
      content: "<p>Start writing...</p>",
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: "1",
      collaborators: [mockCollaborators[0]],
    };
    setDocuments([newDoc, ...documents]);
    setSelectedDocument(newDoc);
  };

  const handleDocumentClick = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const handleBack = () => {
    setSelectedDocument(null);
  };

  const handleContentChange = (content: string) => {
    if (selectedDocument) {
      const updated = {
        ...selectedDocument,
        content,
        updatedAt: new Date(),
      };
      setSelectedDocument(updated);
      setDocuments(docs => 
        docs.map(d => d.id === updated.id ? updated : d)
      );
    }
  };

  const handleTitleChange = (title: string) => {
    if (selectedDocument) {
      const updated = {
        ...selectedDocument,
        title,
        updatedAt: new Date(),
      };
      setSelectedDocument(updated);
      setDocuments(docs => 
        docs.map(d => d.id === updated.id ? updated : d)
      );
    }
  };

  if (selectedDocument) {
    return (
      <DocumentEditor 
        document={selectedDocument}
        onBack={handleBack}
        onContentChange={handleContentChange}
        onTitleChange={handleTitleChange}
      />
    );
  }

  const recentDocs = [...documents].sort((a, b) => 
    b.updatedAt.getTime() - a.updatedAt.getTime()
  ).slice(0, 6);

  const sharedDocs = documents.filter(d => d.collaborators.length > 1);

  return (
    <div className="min-h-screen bg-background">
      <Header onNewDocument={handleNewDocument} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-10 slide-up">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Pick up where you left off or start something new
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger value="recent" className="gap-2 data-[state=active]:bg-background">
              <Clock className="w-4 h-4" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="all" className="gap-2 data-[state=active]:bg-background">
              <FileText className="w-4 h-4" />
              All Documents
            </TabsTrigger>
            <TabsTrigger value="shared" className="gap-2 data-[state=active]:bg-background">
              <Users className="w-4 h-4" />
              Shared with me
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2 data-[state=active]:bg-background">
              <Star className="w-4 h-4" />
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentDocs.map((doc, index) => (
                <div key={doc.id} style={{ animationDelay: `${index * 50}ms` }}>
                  <DocumentCard 
                    document={doc}
                    onClick={() => handleDocumentClick(doc)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc, index) => (
                <div key={doc.id} style={{ animationDelay: `${index * 50}ms` }}>
                  <DocumentCard 
                    document={doc}
                    onClick={() => handleDocumentClick(doc)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shared" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sharedDocs.map((doc, index) => (
                <div key={doc.id} style={{ animationDelay: `${index * 50}ms` }}>
                  <DocumentCard 
                    document={doc}
                    onClick={() => handleDocumentClick(doc)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6 mt-6">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
              <p className="text-muted-foreground max-w-sm">
                Star your most important documents to access them quickly here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
