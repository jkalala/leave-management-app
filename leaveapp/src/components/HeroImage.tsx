'use client';

export function HeroImage() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-3xl mx-auto rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Leave Management System</h2>
            <p className="text-blue-100 text-lg max-w-md mx-auto">
              Streamline your leave management process with our intuitive platform
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-white font-semibold">Easy Requests</div>
                <div className="text-blue-100 text-sm">Submit in seconds</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-white font-semibold">Real-time Updates</div>
                <div className="text-blue-100 text-sm">Instant notifications</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-white font-semibold">Team Calendar</div>
                <div className="text-blue-100 text-sm">Plan ahead</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 