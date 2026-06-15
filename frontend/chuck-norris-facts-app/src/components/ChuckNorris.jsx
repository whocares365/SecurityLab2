import { useState, useEffect } from "react";

export default function ChuckNorris({ token }) {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  const getFact = async () => {
    try {
      setLoading(true);
      await delay(1000);

      const response = await fetch("http://localhost:3333/fact", {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });

      const data = await response.json();
      setFact(data.fact);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFact();
  }, []);

  return (
    <div className="text-center space-y-4">
      
      <h1 className="text-xl font-bold">
        Chuck Norris Fact
      </h1>

      <div className="min-h-[80px] flex items-center justify-center">
        {loading ? (
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        ) : (
          <p className="text-gray-700 text-lg">{fact}</p>
        )}
      </div>

      <button
        onClick={getFact}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Get Another Fact
      </button>
    </div>
  );
}