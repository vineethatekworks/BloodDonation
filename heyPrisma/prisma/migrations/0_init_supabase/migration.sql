-- CreateTable
CREATE TABLE "blood_groups" (
    "bloodgroup" TEXT NOT NULL,
    "available_donors" INTEGER NOT NULL DEFAULT 0,
    "total_donors" INTEGER NOT NULL DEFAULT 0,
    "last_updated" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blood_groups_pkey" PRIMARY KEY ("bloodgroup")
);

-- CreateTable
CREATE TABLE "donation_requests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "requested_by" UUID,
    "blood_group_needed" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donation_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "donor_id" UUID,
    "recipient_id" UUID,
    "request_id" UUID,
    "donation_date" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "blood_group" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "role" TEXT[] DEFAULT ARRAY['donor']::TEXT[],
    "available_to_donate" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "donation_requests" ADD CONSTRAINT "donation_requests_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "donation_requests"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

