const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
      <p>&copy; {year} UniHub. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <a href="mailto:support@unihub.app" className="hover:underline">
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;