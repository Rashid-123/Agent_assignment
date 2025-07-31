const Footer = () => {
    return (
        <footer className="border border-gray-200 p-6 text-center text-sm text-gray-500 bg-white">
            <div className="max-w-screen-xl mx-auto px-4">
                <p>&copy; {new Date().getFullYear()} AgentManager. All rights reserved.</p>
                <div className="mt-2 flex justify-center gap-4 text-xs text-gray-400">
                    <a href="/privacy" className="hover:text-gray-600 transition">Privacy Policy</a>
                    <a href="/terms" className="hover:text-gray-600 transition">Terms of Service</a>
                    <a href="/contact" className="hover:text-gray-600 transition">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
