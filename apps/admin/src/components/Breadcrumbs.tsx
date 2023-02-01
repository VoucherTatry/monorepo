import React, { useEffect, useState } from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { findMerchantById } from '~/lib/db/merchants';

const convertBreadcrumb = (string: string) => {
  if (!string) return 'N/A';
  return string
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toUpperCase();
};

// https://javascript.plainenglish.io/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435
const generateBreadcrumbEntryByPath = async (
  pathElement: string,
  previousPathElement: string
): Promise<string> => {
  if (previousPathElement === 'klienci' || previousPathElement === 'edytuj') {
    const data = await findMerchantById(pathElement);

    return data?.name ?? pathElement;
  }
  return pathElement;
};

const getBreadcrumbElement = async (
  pathTokens: string[],
  inputPathToken: string,
  index: number
): Promise<BreadcrumbElement> => {
  const generateHref = (linkPath: string[], i: number) =>
    `/${linkPath.slice(0, i + 1).join('/')}`;

  let newPathElement = inputPathToken;
  if (index > 0) {
    const previousBreadcrumb = pathTokens[index - 1];

    try {
      newPathElement = await generateBreadcrumbEntryByPath(
        inputPathToken,
        previousBreadcrumb
      );
    } catch (error) {
      console.error(
        `Error from generateBreadcrumbEntryByPath: ${JSON.stringify(error)}`
      );
      const breadcrumbElement: BreadcrumbElement = { breadcrumb: '', href: '' };
      return breadcrumbElement;
    }
  }

  const breadcrumbElement: BreadcrumbElement = {
    breadcrumb: newPathElement,
    href: generateHref(pathTokens, index),
  };
  return breadcrumbElement;
};

const getBreadcrumElementsByPathTokens = async (
  pathTokens: string[]
): Promise<BreadcrumbElement[]> =>
  Promise.all(
    pathTokens.map(async (pathToken, index) => {
      const breadcrumbElement: BreadcrumbElement = await getBreadcrumbElement(
        pathTokens,
        pathToken,
        index
      );
      return breadcrumbElement;
    })
  );

type BreadcrumbElement = {
  breadcrumb: string;
  href: string;
};

export default function Breadcrumbs() {
  const router = useRouter();
  const initialData: BreadcrumbElement[] = [];
  const [breadcrumbs, setBreadcrumbs] = useState(initialData);

  useEffect(() => {
    const generateBreadcrumbs = async () => {
      const pathTokens = router.asPath.split('/');
      pathTokens.shift();

      getBreadcrumElementsByPathTokens(pathTokens)
        .then((breadcrumbElements: BreadcrumbElement[]) => {
          setBreadcrumbs(breadcrumbElements);
        })
        .catch((error) => {
          console.error(`Could not get data: ${JSON.stringify(error)}`);
        });
    };

    if (router.isReady) {
      generateBreadcrumbs();
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <Breadcrumb>
      {breadcrumbs.map(
        (breadcrumbElement: BreadcrumbElement, index: number) => {
          const last = index === breadcrumbs.length - 1;

          if (breadcrumbElement.breadcrumb === undefined) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink fontWeight={last ? 'bold' : undefined}>
                  (not found)
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          }

          if (breadcrumbElement.breadcrumb === 'edytuj') {
            return (
              <BreadcrumbItem key={index} isCurrentPage={last}>
                <BreadcrumbLink fontWeight={last ? 'bold' : undefined}>
                  {convertBreadcrumb(breadcrumbElement.breadcrumb)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          }

          return (
            <BreadcrumbItem key={index} isCurrentPage={last}>
              <Link
                href={breadcrumbElement.href}
                passHref
                legacyBehavior={true}
              >
                <BreadcrumbLink fontWeight={last ? 'bold' : undefined}>
                  {convertBreadcrumb(breadcrumbElement.breadcrumb)}
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          );
        }
      )}
    </Breadcrumb>
  );
}
