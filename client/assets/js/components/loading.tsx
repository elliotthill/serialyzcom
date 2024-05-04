import React from 'react';

import { Spinner } from 'flowbite-react';

export default function loading({loading}: {loading:boolean}) {
    if (loading) {
      return (
        <div className="text-center block w-full">
          <Spinner aria-label="Default status example" size="xl"/>
        </div>
      );
    }

}
