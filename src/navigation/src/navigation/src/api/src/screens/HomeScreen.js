import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, ActivityIndicator,
  SafeAreaView, TouchableOpacity, TextInput
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { generateResponses } from '../api/client';
import { colors } from '../theme/colors';

const HomeScreen = () => {
  const [perspective, setPerspective] = useState('male');
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState('');
  const [toneLevel, setToneLevel] = useState(3);
  
  const { mutate, isPending } = useMutation({
    mutationFn: ({ message, tone }) => generateResponses(message, perspective, tone),
    onSuccess: (data) => setSuggestions(data),
    onError: (error) => console.error('Failed to generate responses:', error)
  });
  
  const handleSubmit = () => {
    if (message.trim() && !isPending) {
      mutate({ message, tone: toneLevel });
    }
  };

  const ResponseCard = ({ type, content }) => (
    <View style={styles.responseCard}>
      <Text style={styles.responseType}>{type}</Text>
      <Text style={styles.responseContent}>{content}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="copy-outline" size={20} color={colors.primary} />
          <Text style={styles.actionText}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="send" size={20} color={colors.primary} />
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ICaptivate</Text>
      </View>
      
      <View style={styles.perspectiveToggle}>
        <TouchableOpacity 
          style={[styles.perspectiveButton, perspective === 'male' && styles.perspectiveButtonActive]}
          onPress={() => setPerspective('male')}
        >
          <Text style={perspective === 'male' ? styles.perspectiveTextActive : styles.perspectiveText}>
            Male Perspective
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.perspectiveButton, perspective === 'female' && styles.perspectiveButtonActive]}
          onPress={() => setPerspective('female')}
        >
          <Text style={perspective === 'female' ? styles.perspectiveTextActive : styles.perspectiveText}>
            Female Perspective
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Enter the message you received..."
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />
          
          <View style={styles.toneContainer}>
            <Text style={styles.toneLabel}>Response Tone:</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.toneText}>Serious</Text>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={5}
                step={1}
                value={toneLevel}
                onValueChange={setToneLevel}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.border}
                thumbTintColor={colors.primary}
              />
              <Text style={styles.toneText}>Playful</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.generateButton, (!message.trim() || isPending) && styles.generateButtonDisabled]}
            onPress={handleSubmit}
            disabled={!message.trim() || isPending}
          >
            {isPending ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Ionicons name="chatbubble-ellipses" size={20} color="#ffffff" />
                <Text style={styles.generateButtonText}>Get Response Suggestions</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        
        {isPending ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Crafting the perfect responses...</Text>
          </View>
        ) : suggestions.length > 0 ? (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.sectionTitle}>Response Suggestions</Text>
            {suggestions.map((suggestion, index) => (
              <ResponseCard key={index} type={suggestion.type} content={suggestion.content} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubble-ellipses-outline" size={60} color={colors.border} />
            <Text style={styles.emptyText}>
              Enter a message above to get AI-powered response suggestions
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.primary },
  perspectiveToggle: { flexDirection: 'row', margin: 16, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  perspectiveButton: { flex: 1, paddingVertical: 10, alignItems: 'center', backgroundColor: 'white' },
  perspectiveButtonActive: { backgroundColor: colors.primary },
  perspectiveText: { fontWeight: '500', color: colors.textSecondary },
  perspectiveTextActive: { fontWeight: '600', color: 'white' },
  content: { flex: 1 },
  inputContainer: { backgroundColor: 'white', borderRadius: 12, padding: 16, margin: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  messageInput: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, minHeight: 100, textAlignVertical: 'top' },
  toneContainer: { marginTop: 16 },
  toneLabel: { fontSize: 16, fontWeight: '500', marginBottom: 8, color: colors.text },
  sliderContainer: { flexDirection: 'row', alignItems: 'center' },
  slider: { flex: 1, height: 40, marginHorizontal: 8 },
  toneText: { color: colors.textTertiary, fontSize: 12, width: 50, textAlign: 'center' },
  generateButton: { backgroundColor: colors.primary, borderRadius: 8, paddingVertical: 12, marginTop: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  generateButtonDisabled: { backgroundColor: colors.primaryLight, opacity: 0.7 },
  generateButtonText: { color: '#ffffff', fontWeight: '600', marginLeft: 8 },
  suggestionsContainer: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16, color: colors.text },
  responseCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  responseType: { fontSize: 14, fontWeight: '500', color: colors.primary, marginBottom: 8 },
  responseContent: { fontSize: 16, lineHeight: 24, color: colors.text, marginBottom: 16 },
  actionButtons: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12 },
  actionButton: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  actionText: { color: colors.primary, fontWeight: '500', marginLeft: 4 },
  loadingContainer: { padding: 40, alignItems: 'center' },
  loadingText: { marginTop: 16, color: colors.textSecondary, fontSize: 16 },
  emptyState: { padding: 40, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: colors.textTertiary, fontSize: 16, textAlign: 'center', marginTop: 16, lineHeight: 24 },
});

export default HomeScreen;
