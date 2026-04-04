'use client'
import { useState, useRef, useCallback } from 'react'
import {
  Heart, MessageCircle, Send, Upload, X, ChevronDown, ChevronUp,
  Edit2, Trash2, Users,
} from 'lucide-react'
import { Comment, Reply } from '@/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.felixbuilds.com'

async function apiPost(path: string, body: object) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

const SEED_COMMENTS: Comment[] = [
  {
    id: '1', name: 'Adaeze Nwosu', initials: 'AN',
    text: 'This transformed our family home completely. The team was professional, punctual, and the finish is absolutely world-class. Highly recommend to everyone!',
    timestamp: '2 days ago', likes: 24, liked: false, isHidden: false,
    replies: [{
      id: 'r1', name: 'Ogochukwuebuka Construction', initials: 'OC',
      text: 'Thank you so much, Adaeze! It was a pleasure working on your home. We\'re delighted you love it! 🏠',
      timestamp: '1 day ago', likes: 8, liked: false,
    }],
  },
  {
    id: '2', name: 'Chukwuemeka Obi', initials: 'CO',
    text: 'We hired them for our office complex in Ikeja. Delivered on time and the structural quality exceeded our expectations. Will definitely work with them again.',
    timestamp: '5 days ago', likes: 17, liked: false, isHidden: false, replies: [],
  },
  {
    id: '3', name: 'Fatima Al-Hassan', initials: 'FA',
    text: 'The attention to sustainability and quality is exactly what Nigeria needs right now. Our villa in Enugu is stunning beyond words.',
    timestamp: '1 week ago', likes: 31, liked: false, isHidden: false, replies: [],
  },
]

/* ── Avatar ── */
function Avatar({ name, initials, avatar, size = 'md' }: {
  name: string; initials: string; avatar?: string; size?: 'sm' | 'md'
}) {
  const sz = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
  if (avatar) return <img src={avatar} alt={name} className={`${sz} rounded-full object-cover ring-2 ring-[#2a3548]`} />
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0090cc] flex items-center justify-center font-semibold text-white ring-2 ring-[#2a3548] shrink-0`}>
      {initials}
    </div>
  )
}

/* ── Reply Form ── */
function ReplyForm({ onSubmit, onCancel }: {
  onSubmit: (text: string, name: string, avatar?: string) => void
  onCancel: () => void
}) {
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState<string | undefined>()
  const fileRef = useRef<HTMLInputElement>(null)

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return
    const r = new FileReader(); r.onload = () => setAvatar(r.result as string); r.readAsDataURL(f)
  }

  return (
    <div className="mt-3 ml-12 md:ml-14  border border-[#2a3548] rounded-xl p-4 space-y-3">
      <div className="flex gap-3 items-center">
        {avatar ? (
          <div className="relative shrink-0">
            <img src={avatar} alt="preview" className="w-8 h-8 rounded-full object-cover ring-2 ring-[#00AEEF]" />
            <button onClick={() => setAvatar(undefined)} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <X className="w-2.5 h-2.5 text-white" />
            </button>
          </div>
        ) : (
          <button onClick={() => fileRef.current?.click()} className="w-8 h-8 rounded-full border-2 border-dashed border-[#2a3548] hover:border-[#00AEEF] flex items-center justify-center shrink-0 transition-colors group">
            <Upload className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-[#00AEEF] transition-colors" />
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImg} />
        <input
          value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Your name *"
          className="flex-1 bg-[#0d1117] border border-[#2a3548] rounded-lg px-3 py-2 text-xs text-white placeholder-[#8b949e] focus:outline-none focus:border-[#00AEEF] transition-colors"
        />
      </div>
      <input
        value={text} onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && text.trim() && name.trim()) { onSubmit(text.trim(), name.trim(), avatar); setText(''); setName('') } }}
        placeholder="Write a reply... (Enter to send)"
        className="w-full bg-[#0d1117] border border-[#2a3548] rounded-lg px-3 py-2 text-xs text-white placeholder-[#8b949e] focus:outline-none focus:border-[#00AEEF] transition-colors"
      />
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-3 py-1.5 text-xs text-[#8b949e] hover:text-white transition-colors">Cancel</button>
        <button
          onClick={() => { if (text.trim() && name.trim()) { onSubmit(text.trim(), name.trim(), avatar); setText(''); setName('') } }}
          disabled={!text.trim() || !name.trim()}
          className="px-4 py-1.5 bg-[#00AEEF] text-white text-xs font-semibold rounded-lg hover:bg-[#38c6ff] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
        >
          <Send className="w-3 h-3" /> Reply
        </button>
      </div>
    </div>
  )
}

/* ── Comment Card ── */
function CommentCard({ comment, currentUser, onLike, onLikeReply, onAddReply, onEdit, onDelete }: {
  comment: Comment; currentUser: string
  onLike: (id: string) => void; onLikeReply: (cId: string, rId: string) => void
  onAddReply: (cId: string, text: string, name: string, avatar?: string) => void
  onEdit: (id: string, text: string) => void; onDelete: (id: string) => void
}) {
  const [replying, setReplying] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(comment.text)
  const isOwner = comment.name === currentUser

  return (
    <div className="bg-[#161b22] border border-[#2a3548] rounded-xl p-5 transition-all">
      <div className="flex gap-3">
        <Avatar name={comment.name} initials={comment.initials} avatar={comment.avatar} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="font-semibold text-white text-sm">{comment.name}</span>
            <span className="text-[#8b949e] text-xs">{comment.timestamp}</span>
            {comment.editedAt && <span className="text-[#8b949e] text-xs italic">(edited)</span>}
          </div>

          {editing ? (
            <div className="space-y-2 mb-3">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={3}
                className="w-full bg-[#0d1117] border border-[#00AEEF]/40 rounded-lg px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-[#00AEEF] transition-colors"
              />
              <div className="flex gap-2">
                <button onClick={() => { onEdit(comment.id, editText); setEditing(false) }}
                  className="px-3 py-1.5 bg-[#00AEEF] text-white text-xs font-semibold rounded-lg hover:bg-[#38c6ff] transition-colors">Save</button>
                <button onClick={() => { setEditing(false); setEditText(comment.text) }}
                  className="px-3 py-1.5 text-[#8b949e] text-xs hover:text-white transition-colors">Cancel</button>
              </div>
            </div>
          ) : (
            <p className="text-[#c9d1d9] text-sm leading-relaxed mb-3">{comment.text}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 flex-wrap">
            <button onClick={() => onLike(comment.id)}
              className={`flex items-center gap-1.5 text-xs transition-colors ${comment.liked ? 'text-red-400' : 'text-[#8b949e] hover:text-red-400'}`}>
              <Heart className={`w-3.5 h-3.5 ${comment.liked ? 'fill-current' : ''}`} />
              <span>{comment.likes}</span>
            </button>
            <button onClick={() => { setReplying(!replying); setShowReplies(true) }}
              className="flex items-center gap-1.5 text-xs text-[#8b949e] hover:text-[#00AEEF] transition-colors">
              <MessageCircle className="w-3.5 h-3.5" /> Reply
            </button>
            {comment.replies.length > 0 && (
              <button onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-1 text-xs text-[#00AEEF]/70 hover:text-[#00AEEF] transition-colors font-medium">
                {showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </button>
            )}
            {isOwner && !editing && (
              <>
                <button onClick={() => setEditing(true)} className="flex items-center gap-1 text-xs text-[#8b949e] hover:text-white transition-colors">
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => onDelete(comment.id)} className="flex items-center gap-1 text-xs text-[#8b949e] hover:text-red-400 transition-colors">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reply form */}
      {replying && !editing && (
        <ReplyForm
          onSubmit={(text, name, avatar) => {
            onAddReply(comment.id, text, name, avatar)
            setReplying(false); setShowReplies(true)
          }}
          onCancel={() => setReplying(false)}
        />
      )}

      {/* Replies list */}
      {showReplies && comment.replies.length > 0 && (
        <div className="mt-4 ml-10 md:ml-12 space-y-3">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex gap-3 bg-[#1c2230] rounded-lg p-3 border border-[#2a3548]">
              <Avatar name={reply.name} initials={reply.initials} avatar={reply.avatar} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-white text-xs">{reply.name}</span>
                  <span className="text-[#8b949e] text-xs">{reply.timestamp}</span>
                  {reply.editedAt && <span className="text-[#8b949e] text-xs italic">(edited)</span>}
                </div>
                <p className="text-[#c9d1d9] text-xs leading-relaxed">{reply.text}</p>
                <button onClick={() => onLikeReply(comment.id, reply.id)}
                  className={`flex items-center gap-1 text-xs mt-2 transition-colors ${reply.liked ? 'text-red-400' : 'text-[#8b949e] hover:text-red-400'}`}>
                  <Heart className={`w-3.5 h-3.5 ${reply.liked ? 'fill-current' : ''}`} />
                  <span>{reply.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Main CommentSection ── */
export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS)
  const [newText, setNewText] = useState('')
  const [newName, setNewName] = useState('')
  const [newAvatar, setNewAvatar] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; text?: string }>({})
  const fileRef = useRef<HTMLInputElement>(null)
  const [currentUser, setCurrentUser] = useState('')

  const getInitials = (name: string) =>
    name.trim().split(/\s+/).map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return
    const r = new FileReader(); r.onload = () => setNewAvatar(r.result as string); r.readAsDataURL(f)
  }

  const validate = () => {
    const e: { name?: string; text?: string } = {}
    if (!newName.trim()) e.name = 'Name is required'
    else if (newName.trim().length < 2) e.name = 'Name must be at least 2 characters'
    if (!newText.trim()) e.text = 'Comment cannot be empty'
    else if (newText.trim().length < 5) e.text = 'Comment must be at least 5 characters'
    setErrors(e); return Object.keys(e).length === 0
  }

  const addComment = async () => {
    if (!validate()) return
    setSubmitting(true)
    try {
      // Uncomment to connect to backend:
      // await apiPost('/api/comments/', { name: newName.trim(), text: newText.trim(), avatar: newAvatar })
      const name = newName.trim()
      setCurrentUser(name)
      const c: Comment = {
        id: Date.now().toString(), name, initials: getInitials(name),
        avatar: newAvatar, text: newText.trim(),
        timestamp: 'Just now', likes: 0, liked: false, replies: [], isHidden: false,
      }
      setComments((prev) => [c, ...prev])
      setNewText(''); setNewName(''); setNewAvatar(undefined); setErrors({})
    } catch {
      setErrors({ text: 'Failed to post comment. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const likeComment = useCallback((id: string) => {
    setComments((prev) => prev.map((c) =>
      c.id === id ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c
    ))
  }, [])

  const likeReply = useCallback((cId: string, rId: string) => {
    setComments((prev) => prev.map((c) =>
      c.id === cId ? { ...c, replies: c.replies.map((r) =>
        r.id === rId ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r
      )} : c
    ))
  }, [])

  const addReply = useCallback((cId: string, text: string, name: string, avatar?: string) => {
    setComments((prev) => prev.map((c) =>
      c.id === cId ? { ...c, replies: [...c.replies, {
        id: Date.now().toString(), name, initials: getInitials(name),
        avatar, text, timestamp: 'Just now', likes: 0, liked: false,
      }]} : c
    ))
  }, [])

  const editComment = useCallback((id: string, text: string) => {
    setComments((prev) => prev.map((c) => c.id === id ? { ...c, text, editedAt: 'just now' } : c))
  }, [])

  const deleteComment = useCallback((id: string) => {
    if (!window.confirm('Delete this comment?')) return
    setComments((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const publicComments = comments.filter((c) => !c.isHidden)
  const totalPeople = publicComments.length
  const totalReplies = publicComments.reduce((a, c) => a + c.replies.length, 0)

  const [showCount, setShowCount] = useState(2)
  const visibleComments = publicComments.slice(0, showCount)
  const hasMore = publicComments.length > showCount

  // Show only 2 most recent commenters in roster
  const recentCommenters = publicComments.slice(0, 2)
  const remainingCount = totalPeople > 2 ? totalPeople - 2 : 0

  const peopleLabel = totalPeople === 0 ? 'No comments yet'
    : totalPeople === 1 ? '1 person commented'
    : totalPeople < 10 ? `${totalPeople} people commented`
    : `${totalPeople}+ people commented`

  return (
    <section className="py-20 md:py-24 bg-colorbo">
      <div className="max-w-3xl mx-auto px-5 md:px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="text-colorbrand font-mono text-sm uppercase tracking-widest mb-2">Comment</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-colorbo mb-3">
            Join the <span className="text-gradient">Conversation</span>
          </h2>
          <div className="flex items-center gap-5 text-sm text-[#8b949e] flex-wrap">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-colorbrand" />
              <span><strong className="text-white">{totalPeople}</strong> comments</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-colorbrand" />
              <span><strong className="text-white">{totalPeople}</strong> people joined</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-colorbrand" />
              <span><strong className="text-white">{totalReplies}</strong> replies</span>
            </div>
          </div>
        </div>

        
        {/* New comment form */}
        <div className="mb-10 bg-colorbo border border-[#2a3548] rounded-xl p-5 space-y-4">
          <p className="text-sm font-semibold text-white">Leave a comment</p>
          <div className="flex gap-3 items-start">
            <div className="shrink-0 mt-1">
              {newAvatar ? (
                <div className="relative">
                  <img src={newAvatar} alt="preview" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#00AEEF]" />
                  <button onClick={() => setNewAvatar(undefined)} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <X className="w-2.5 h-2.5 text-white" />
                  </button>
                </div>
              ) : (
                <button onClick={() => fileRef.current?.click()}
                  className="w-10 h-10 rounded-full border-2 border-dashed border-[#2a3548] hover:border-[#00AEEF] flex items-center justify-center transition-colors group" title="Upload photo">
                  <Upload className="w-4 h-4 text-[#8b949e] group-hover:text-[#00AEEF] transition-colors" />
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImg} />
            </div>
            <div className="flex-1">
              <input value={newName}
                onChange={(e) => { setNewName(e.target.value); setErrors((p) => ({ ...p, name: undefined })) }}
                placeholder="Your name *"
                className={`w-full bg-[#0d1117] border rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#8b949e] focus:outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-[#2a3548] focus:border-[#00AEEF]'}`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
          </div>
          {newName && !newAvatar && (
            <p className="text-xs text-[#8b949e]">
              Your initials <span className="text-[#00AEEF] font-bold">{getInitials(newName)}</span> will be shown as your avatar
            </p>
          )}
          <div>
            <textarea value={newText}
              onChange={(e) => { setNewText(e.target.value); setErrors((p) => ({ ...p, text: undefined })) }}
              placeholder="Share your experience, ask a question, or leave feedback..."
              rows={3}
              className={`w-full bg-[#0d1117] border rounded-lg px-4 py-3 text-sm text-white placeholder-[#8b949e] focus:outline-none transition-colors resize-none ${errors.text ? 'border-red-500' : 'border-[#2a3548] focus:border-[#00AEEF]'}`}
            />
            {errors.text && <p className="text-red-400 text-xs mt-1">{errors.text}</p>}
          </div>
          <div className="flex justify-between items-center gap-3 flex-wrap">
            <p className="text-xs text-[#8b949e]">Upload a photo or your initials will be used automatically.</p>
            <button onClick={addComment} disabled={submitting}
              className="px-5 py-2.5 bg-[#00AEEF] text-white text-sm font-semibold rounded-lg hover:bg-[#38c6ff] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-[#00AEEF]/20">
              {submitting
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Posting…</>
                : <><Send className="w-4 h-4" /> Post Comment</>}
            </button>
          </div>
        </div>

        {/* Comments list */}
        <div className="space-y-4">
          {publicComments.length === 0 ? (
            <div className="text-center py-12 text-[#8b949e]">
              <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No comments yet. Be the first!</p>
            </div>
          ) : visibleComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
              onLike={likeComment}
              onLikeReply={likeReply}
              onAddReply={addReply}
              onEdit={editComment}
              onDelete={deleteComment}
            />
          ))}
        </div>

        {/* View More / View Less */}
        {publicComments.length > 2 && (
          <div className="mt-6 text-center">
            {hasMore ? (
              <button
                onClick={() => setShowCount((prev) => prev + 5)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-colorbo border border-[#2a3548] text-gray-300 text-sm font-medium rounded-xl hover:bg-colorbrand hover:border-[#00AEEF]/40 hover:text-white transition-all"
              >
                <ChevronDown className="w-4 h-4" />
                View more comments ({publicComments.length - showCount} )
              </button>
            ) : (
              <button
                onClick={() => setShowCount(2)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#161b22] border border-[#2a3548] text-[#8b949e] text-sm font-medium rounded-xl hover:bg-colorbrand hover:border-[#00AEEF]/40 hover:text-white transition-all"
              >
                <ChevronUp className="w-4 h-4" />
                Show less
              </button>
            )}
          </div>
        )}

      </div>
      <p className="text-[#8b949e] text-xs text-center mt-8 leading-relaxed">
  All comments are reviewed. Please keep discussions relevant and respectful.
</p>
    </section>
  )
}
