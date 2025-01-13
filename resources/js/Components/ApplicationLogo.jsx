export default function ApplicationLogo({ size = "w-10 h-10", textSize = "text-xl" }) {
    return (
        <div className={`${size} bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center`}>
            <span className={`text-white ${textSize} font-bold`}>P</span>
        </div>
    );
}

