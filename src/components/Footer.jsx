import React from 'react';
import Button from 'react-bootstrap/Button'; // Add this line
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Add this line
import { faFacebookF, faTwitter, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'; // Add this line

export default function Footer() {
  return (
    <div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-warning mt-5">
          <div className="text-white mb-3 mb-md-0">Copyright © 2024. All rights reserved.</div>
          <div>
            <Button variant="link" className="text-white mx-2">
              <FontAwesomeIcon icon={faFacebookF} />
            </Button>
            <Button variant="link" className="text-white mx-2">
              <FontAwesomeIcon icon={faTwitter} />
            </Button>
            <Button variant="link" className="text-white mx-2">
              <FontAwesomeIcon icon={faGoogle} />
            </Button>
            <Button variant="link" className="text-white mx-2">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </Button>
          </div>
      </div>
    </div>
  )
}