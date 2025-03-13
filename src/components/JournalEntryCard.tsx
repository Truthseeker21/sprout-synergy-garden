
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { JournalEntry } from '@/types/UserTypes';
import { CalendarDays, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JournalEntryCardProps {
  entry: JournalEntry;
  onClick?: () => void;
}

const JournalEntryCard = ({ entry, onClick }: JournalEntryCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(entry.date), { addSuffix: true });
  
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <div className="text-xs text-muted-foreground">{formattedDate}</div>
        </div>
        
        <h3 className="font-semibold text-base mb-1">{entry.title}</h3>
        <p className="text-sm line-clamp-3 mb-3">{entry.content}</p>
        
        {entry.tags && entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {entry.tags.map((tag, index) => (
              <div key={index} className="bg-muted text-xs px-2 py-1 rounded-full flex items-center">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JournalEntryCard;
