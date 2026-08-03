import { getSecretResults } from "../actions";
import { ArrowLeft, MessageCircleHeart, Users } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const results = await getSecretResults();

  return (
    <div className="min-h-screen bg-[#faf7f5] p-5 sm:p-10 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm font-semibold text-rose-500">
            <Users className="w-4 h-4" />
            {results.length} Guesses
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-rose-100/50 p-6 sm:p-10 border border-rose-50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-200/50">
              <MessageCircleHeart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Secret Submissions</h1>
              <p className="text-gray-500 text-sm mt-1">See who has been guessing!</p>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>No one has guessed yet... 🥺</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
                    <th className="pb-4 font-semibold px-4">Time</th>
                    <th className="pb-4 font-semibold px-4">Type</th>
                    <th className="pb-4 font-semibold px-4">Guess / Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {results.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(r.timestamp).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-sm whitespace-nowrap">
                        {r.admitted ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-600">
                            Admitted (Yes)
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-600">
                            Custom Name
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-800">
                        {r.admitted ? "Themself 💕" : `"${r.guess}"`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
