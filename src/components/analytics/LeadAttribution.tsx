"use client";

// First-touch attribution capture for the MEGA Keystone lead pipeline.
// UTMs and click IDs are only in the URL of the page the visitor lands on, so a
// visitor who browses from an ad landing page to the contact page before
// converting would submit with nothing to attribute. Running the capture once
// per page load persists the first touch for whichever form they eventually use.

import { useEffect } from "react";
import { captureLeadContext } from "@/lib/megaLeadContext";

export default function LeadAttribution() {
  useEffect(() => {
    captureLeadContext();
  }, []);

  return null;
}
