import React from "react";

function Navbar() {
  return (
    <div>
      <header class="bg-white">
        <nav
          class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div class="flex lg:flex-1">
            <a href="#" class="-m-1.5 p-1.5">
              logo
            </a>
          </div>

          <div class="hidden lg:flex lg:gap-x-12">
            <div class="relative"></div>

            <a href="/" class="text-sm font-semibold leading-6 text-gray-900">
              Home
            </a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
              About
            </a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
              Services
            </a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
              Contact Us
            </a>
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" class="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <div class="lg:hidden" role="dialog" aria-modal="true">
          <div class="fixed inset-0 z-10"></div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
