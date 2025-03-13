
import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import JournalEntryCard from '@/components/JournalEntryCard'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Plus, 
  BookOpen, 
  Leaf, 
  FileText,
  Search,
  X
} from 'lucide-react';

// Sample journal entries for demonstration
const sampleEntries = [
  {
    id: '1',
    title: 'Spring Planting',
    content: 'Started planting tomatoes and basil today. The soil was well prepared with compost.',
    date: '2023-04-15',
    plants: ['Tomato', 'Basil'],
    images: ['/placeholder.svg'],
    weather: 'Sunny, 72°F'
  },
  {
    id: '2',
    title: 'First Sprouts',
    content: 'Noticed the first sprouts from the lettuce seeds I planted last week. Very exciting!',
    date: '2023-04-20',
    plants: ['Lettuce'],
    images: ['/placeholder.svg'],
    weather: 'Partly Cloudy, 65°F'
  },
  {
    id: '3',
    title: 'Garden Maintenance',
    content: 'Added mulch around the plants to help retain moisture during the upcoming hot days.',
    date: '2023-04-28',
    plants: ['Tomato', 'Pepper', 'Cucumber'],
    images: [],
    weather: 'Sunny, 80°F'
  }
];

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEntries = sampleEntries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.plants.some(plant => plant.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <MainLayout title="Garden Journal">
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search journal entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button className="ml-4">
          <Plus className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>
      
      <Tabs defaultValue="entries">
        <TabsList className="mb-6">
          <TabsTrigger value="entries">
            <BookOpen className="h-4 w-4 mr-2" />
            All Entries
          </TabsTrigger>
          <TabsTrigger value="plants">
            <Leaf className="h-4 w-4 mr-2" />
            By Plant
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="notes">
            <FileText className="h-4 w-4 mr-2" />
            Quick Notes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="entries">
          {filteredEntries.length > 0 ? (
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <JournalEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No journal entries match your search criteria.</p>
              <button 
                className="text-primary hover:underline"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="plants">
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">This feature is coming soon!</p>
            <p>Track progress for each plant in your garden.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="calendar">
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">Calendar view is coming soon!</p>
            <p>View your garden activities on a calendar.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="notes">
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">Quick Notes feature is coming soon!</p>
            <p>Jot down quick observations without creating full entries.</p>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Journal;
