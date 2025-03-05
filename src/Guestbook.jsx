import { useState, useEffect } from "react";

export default function Guestbook() {
    const [entries, setEntries] = useState([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("https://umjunsik-back-production.up.railway.app/entries")
            .then((res) => res.json())
            .then((data) => setEntries(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !message) return;

        const res = await fetch("https://umjunsik-back-production.up.railway.app/entries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, message }),
        });

        if (res.ok) {
            const savedEntry = await res.json();
            setEntries([savedEntry, ...entries]);
            setName("");
            setMessage("");
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">엄준식은 살아있다</h1>
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl h-[85vh]">
                {/* 입력 폼 */}
                <form
                    className="bg-white p-6 rounded-2xl shadow-xl w-full md:w-1/2 flex flex-col justify-center space-y-4 h-full"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="이름"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        placeholder="메시지를 남겨주세요..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-40 text-gray-900"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
                    >
                        제출하기
                    </button>
                </form>

                {/* 메시지 목록 */}
                <div className="bg-white p-6 rounded-2xl shadow-xl w-full md:w-1/2 h-full overflow-y-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">메시지 목록</h2>
                    {entries.length > 0 ? (
                        entries.map((entry, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-xl shadow-md border border-gray-200 mb-4">
                                <p className="font-semibold text-lg text-gray-800">{entry.name}</p>
                                <p className="text-gray-700 text-md">{entry.message}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">아직 메시지가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
