import Link from "next/link";

const Contact = () => {
  return (
    <div className="ml-2">
      <h3 className="text-gray-500 text-sm mb-1">Customer Supports:</h3>
      <ul>
        <li className="mb-1">
          <Link
            className="text-gray-50 font-semibold text-md"
            href="tel:+48531770282"
          >
            +48 531-770-282
          </Link>
        </li>
        <li className="text-gray-300 mb-1 text-xs">34-734 Kasinka Mala</li>
        <li className="text-gray-300 mb-2 text-xs">Kasinka Mala 353</li>
        <li>
          <Link href="mailto:kontakt@magiadruku3d.pl">
            kontakt@magiadruku3d.pl
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Contact;
