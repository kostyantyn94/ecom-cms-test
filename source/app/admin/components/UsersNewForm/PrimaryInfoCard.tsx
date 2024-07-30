import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';

export const PrimaryInfoCard = () => {

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary info
        </Text>
        <FormLayout>
          <FormLayout.Group>
            <ValidatedTextField
              label="First Name"
              type="text"
              name="firstName"
              autoComplete="given-name"
            />
            <ValidatedTextField
              label="Last Name"
              type="text"
              name="lastName"
              autoComplete="family-name"
            />
          </FormLayout.Group>
          <ValidatedTextField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
