'use client'

import {
  Box,
  VStack,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { MotionBox } from '@/lib/motion'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const mailtoLink = `mailto:adityasai3230@gmail.com?subject=Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`
    window.location.href = mailtoLink

    toast({
      title: 'Opening email client',
      description: 'Please send your message from your email client.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })

    setIsSubmitting(false)
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      as="form"
      onSubmit={handleSubmit}
      maxW="600px"
      mx="auto"
    >
      <VStack spacing={6} align="stretch" fontFamily="mono">
        <FormControl isRequired>
          <FormLabel fontFamily="mono" textTransform="uppercase" letterSpacing="0.1em" fontSize="sm">
            &gt; Name
          </FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="your_name"
            bg="white"
            _dark={{ bg: 'black' }}
            border="1px solid"
            borderColor="black"
            _dark={{ borderColor: 'white' }}
            borderRadius="0"
            fontFamily="mono"
            _focus={{ borderColor: 'black', _dark: { borderColor: 'white' }, boxShadow: 'none' }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontFamily="mono" textTransform="uppercase" letterSpacing="0.1em" fontSize="sm">
            &gt; Email
          </FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            bg="white"
            _dark={{ bg: 'black' }}
            border="1px solid"
            borderColor="black"
            _dark={{ borderColor: 'white' }}
            borderRadius="0"
            fontFamily="mono"
            _focus={{ borderColor: 'black', _dark: { borderColor: 'white' }, boxShadow: 'none' }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontFamily="mono" textTransform="uppercase" letterSpacing="0.1em" fontSize="sm">
            &gt; Message
          </FormLabel>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="your message here..."
            rows={6}
            bg="white"
            _dark={{ bg: 'black' }}
            border="1px solid"
            borderColor="black"
            _dark={{ borderColor: 'white' }}
            borderRadius="0"
            fontFamily="mono"
            _focus={{ borderColor: 'black', _dark: { borderColor: 'white' }, boxShadow: 'none' }}
          />
        </FormControl>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          loadingText="Sending..."
          fontFamily="mono"
        >
          [SEND MESSAGE]
        </Button>
      </VStack>
    </MotionBox>
  )
}

