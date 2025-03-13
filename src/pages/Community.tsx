
import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { forumPosts } from '@/data/forumPosts';
import ForumPostCard from '@/components/ForumPostCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MessageSquare, Users, Trophy, X } from 'lucide-react';

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPosts = forumPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const popularPosts = [...forumPosts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 6);
  
  const recentPosts = [...forumPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);
  
  return (
    <MainLayout title="Community Forum">
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search community posts..."
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
        <Button className="ml-2">
          <MessageSquare className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            <MessageSquare className="h-4 w-4 mr-2" />
            All Posts
          </TabsTrigger>
          <TabsTrigger value="popular">
            <Trophy className="h-4 w-4 mr-2" />
            Popular
          </TabsTrigger>
          <TabsTrigger value="recent">
            <MessageSquare className="h-4 w-4 mr-2" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="following">
            <Users className="h-4 w-4 mr-2" />
            Following
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-4">
              {filteredPosts.map((post) => (
                <ForumPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No posts match your search criteria.</p>
              <button 
                className="text-primary hover:underline"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="popular">
          <div className="grid gap-4">
            {popularPosts.map((post) => (
              <ForumPostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="grid gap-4">
            {recentPosts.map((post) => (
              <ForumPostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="following">
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">You're not following any users yet.</p>
            <Button>Discover Gardeners to Follow</Button>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Community;
