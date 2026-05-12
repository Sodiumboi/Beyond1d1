import { signIn } from '@/auth'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-950">
      <div className="w-full max-w-sm rounded-2xl border border-stone-800 bg-stone-900 p-8 text-center">
        <div className="mb-2 text-4xl">🎲</div>
        <h1 className="mb-1 font-serif text-2xl font-bold text-stone-100">Beyond1d1</h1>
        <p className="mb-8 text-sm text-stone-400">Sign in to access your campaigns</p>
        <form
          action={async () => {
            'use server'
            await signIn('discord', { redirectTo: '/characters' })
          }}
        >
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            Continue with Discord
          </button>
        </form>
      </div>
    </main>
  )
}
