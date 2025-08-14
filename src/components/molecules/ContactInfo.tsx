'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';
import { Text, Button } from '@/components/atoms';

interface ContactInfoProps {
  phone?: string;
  phoneSubtitle?: string;
  messengers?: {
    telegram?: string;
    whatsapp?: string;
    viber?: string;
  };
  website?: string;
  socialMedia?: {
    vk?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
    google?: string;
  };
  className?: string;
}

interface ContactRowProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightText?: string;
  onClick?: () => void;
  showBorder?: boolean;
}

/**
 * ContactRow Component
 * Individual contact row with icon, text, and optional action
 */
function ContactRow({ 
  icon, 
  title, 
  subtitle, 
  rightText, 
  onClick, 
  showBorder = true 
}: ContactRowProps) {
  return (
    <div
      className="contact-row flex flex-row gap-3 items-start justify-start pl-4 pr-0 py-0 relative shrink-0 w-full cursor-pointer"
      onClick={onClick}
    >
      {/* Icon Container */}
      <div
        className="flex flex-row items-center justify-center pt-3 pb-0 px-0 relative shrink-0"
        style={{
          paddingTop: subtitle ? '19px' : '11px',
        }}
      >
        <div
          className="shrink-0 w-6 h-6 flex items-center justify-center"
          style={{
            color: tokens.colors.text.primary,
            fontSize: '16px',
          }}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 flex flex-row gap-2 items-start justify-start min-h-px min-w-px overflow-clip pr-4 relative shrink-0"
        style={{
          paddingTop: subtitle ? '10px' : '12px',
          paddingBottom: subtitle ? '12px' : '14px',
          borderBottom: showBorder ? `0.5px solid rgba(137,137,137,0.3)` : 'none',
        }}
      >
        {/* Title and Subtitle */}
        <div className="flex-1 flex flex-col gap-0.5 items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
          {/* Title */}
          <div className="flex flex-row items-start justify-start p-0 relative shrink-0 w-full">
            <Text
              as="span"
              style={{
                fontSize: tokens.typography.fontSize.lg, // 16px
                fontWeight: tokens.typography.fontWeight.normal, // 400
                color: tokens.colors.text.primary,
                lineHeight: '20px',
                letterSpacing: '-0.24px',
                margin: 0,
              }}
            >
              {title}
            </Text>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div className="flex flex-row items-start justify-start p-0 relative shrink-0 w-full">
              <Text
                as="span"
                style={{
                  fontSize: tokens.typography.fontSize.base, // 14px
                  fontWeight: tokens.typography.fontWeight.normal, // 400
                  color: tokens.colors.text.secondary,
                  lineHeight: '18px',
                  letterSpacing: '-0.28px',
                  margin: 0,
                }}
              >
                {subtitle}
              </Text>
            </div>
          )}
        </div>

        {/* Right Text with Icon */}
        {rightText && (
          <div className="flex flex-row gap-0.5 items-start justify-start pt-2.5 pb-0 px-0 relative shrink-0">
            <Text
              as="span"
              style={{
                fontSize: tokens.typography.fontSize.lg, // 16px
                fontWeight: tokens.typography.fontWeight.normal, // 400
                color: tokens.colors.text.secondary,
                lineHeight: '20px',
                letterSpacing: '-0.24px',
                margin: 0,
              }}
            >
              {rightText}
            </Text>
            <div className="w-6 h-5 relative shrink-0 flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <span style={{ color: tokens.colors.text.secondary, fontSize: '12px' }}>▼</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * SocialMediaButtons Component
 * Horizontal scrollable row of social media buttons
 */
interface SocialMediaButtonsProps {
  socialMedia: {
    vk?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
    google?: string;
  };
}

function SocialMediaButtons({ socialMedia }: SocialMediaButtonsProps) {
  const socialButtons = [
    { key: 'vk', url: socialMedia.vk, label: 'VK', bg: '#4C75A3' },
    { key: 'youtube', url: socialMedia.youtube, label: 'YT', bg: '#FF0000' },
    { key: 'twitter', url: socialMedia.twitter, label: 'T', bg: '#1DA1F2' },
    { key: 'facebook', url: socialMedia.facebook, label: 'f', bg: '#4267B2' },
    { key: 'google', url: socialMedia.google, label: 'G', bg: '#4285F4' },
  ].filter(item => item.url);

  if (socialButtons.length === 0) return null;

  return (
    <div
      className="flex flex-col items-start justify-start pt-2 pb-4 px-0 relative shrink-0 w-full"
    >
      <div className="h-10 relative shrink-0 w-full">
        {/* Gradient masks for horizontal scroll */}
        <div className="absolute inset-0">
          <div className="absolute bg-gradient-to-l bottom-0 from-transparent from-[5.625%] right-0 to-black top-0 w-5 opacity-10" />
          <div className="absolute bottom-0 left-5 right-5 top-0" />
          <div className="absolute bg-gradient-to-r bottom-0 from-transparent from-[5.625%] left-0 to-black top-0 w-5 opacity-10" />
        </div>

        {/* Scrollable buttons */}
        <div
          className="absolute flex flex-row gap-2 items-center justify-start left-12 right-1 top-1/2 -translate-y-1/2 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {socialButtons.map((button) => (
            <Button
              key={button.key}
              variant="ghost"
              size="sm"
              onClick={() => {
                if (button.url) {
                  window.open(button.url, '_blank');
                }
              }}
              style={{
                backgroundColor: 'rgba(20,20,20,0.06)',
                borderRadius: tokens.borders.radius.lg,
                padding: '10px', // 2.5 * 4px
                minWidth: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                flexShrink: 0,
              }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                style={{ backgroundColor: button.bg }}
              >
                {button.label}
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * ContactInfo Molecule
 * Complete contact information component based on Figma design 322-78232
 * 
 * Features:
 * - Phone number with subtitle and call action
 * - Messenger options (Telegram, WhatsApp, Viber)
 * - Website link
 * - Social media buttons row
 * - Exact styling from Figma specifications
 */
export function ContactInfo({
  phone,
  phoneSubtitle = 'бесплатная единая справочная - пн-пт 7:00-21:00',
  messengers = {},
  website,
  socialMedia = {},
  className = '',
}: ContactInfoProps) {
  
  const handlePhoneClick = () => {
    if (phone) {
      window.location.href = `tel:${phone.replace(/\s/g, '')}`;
    }
  };

  const handleTelegramClick = () => {
    if (messengers.telegram) {
      const telegramUrl = messengers.telegram.startsWith('@') 
        ? `https://t.me/${messengers.telegram.slice(1)}`
        : `https://t.me/${messengers.telegram}`;
      window.open(telegramUrl, '_blank');
    }
  };

  const handleWebsiteClick = () => {
    if (website) {
      const url = website.startsWith('http') ? website : `https://${website}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div
      className={`contact-info flex flex-col items-start justify-start p-0 relative rounded-xl w-full ${className}`}
      style={{
        backgroundColor: tokens.colors.background.primary,
      }}
    >
      {/* Contact Rows */}
      <div className="flex flex-col items-start justify-start overflow-clip p-0 relative shrink-0 w-full">
        
        {/* Phone Row */}
        {phone && (
          <ContactRow
            icon="📞"
            title={phone}
            subtitle={phoneSubtitle}
            rightText="3"
            onClick={handlePhoneClick}
          />
        )}

        {/* Telegram Row */}
        {messengers.telegram && (
          <ContactRow
            icon="💬"
            title="Написать в Telegram"
            onClick={handleTelegramClick}
          />
        )}

        {/* Website Row */}
        {website && (
          <ContactRow
            icon="🌐"
            title={website}
            rightText="1"
            onClick={handleWebsiteClick}
            showBorder={Object.keys(socialMedia).length === 0} // Only show border if no social buttons follow
          />
        )}

        {/* Social Media Buttons */}
        {Object.keys(socialMedia).length > 0 && (
          <SocialMediaButtons socialMedia={socialMedia} />
        )}
      </div>
    </div>
  );
}