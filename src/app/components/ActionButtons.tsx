import { Bell, Share2, ThumbsUp, MessageSquare } from 'lucide-react';

export function ActionButtons() {
  return (
    <div className="flex items-center gap-3 mt-8">
      <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors text-[13px] font-medium">
        <Bell size={16} />
        Subscribe
      </button>
      <button className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors text-[13px] font-medium">
        <Share2 size={16} />
        Share
      </button>
      <button className="flex items-center gap-2 px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors text-[13px] font-medium">
        <ThumbsUp size={16} />
        Like
      </button>
      <button className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors text-[13px] font-medium">
        <MessageSquare size={16} />
        Feedback
      </button>
    </div>
  );
}
