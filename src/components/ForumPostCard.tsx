
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ForumPost } from '@/data/forumPosts';
import { MessageCircle, ThumbsUp, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ForumPostCardProps {
  post: ForumPost;
  onClick?: () => void;
}

const ForumPostCard = ({ post, onClick }: ForumPostCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="h-8 w-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <img 
              src={post.userAvatar || '/placeholder.svg'} 
              alt={post.userName} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-sm">{post.userName}</div>
            <div className="text-xs text-muted-foreground">{formattedDate}</div>
          </div>
        </div>
        
        <h3 className="font-semibold text-base mb-1">{post.title}</h3>
        <p className="text-sm line-clamp-2 mb-3">{post.content}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 3).map((tag, index) => (
            <div key={index} className="bg-muted text-xs px-2 py-1 rounded-full flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </div>
          ))}
          {post.tags.length > 3 && (
            <div className="bg-muted text-xs px-2 py-1 rounded-full">
              +{post.tags.length - 3} more
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-1" />
            {post.likes} likes
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-1" />
            {post.comments.length} comments
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForumPostCard;
