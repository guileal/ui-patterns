<?php
/*
Plugin Name: Custom Posts
Description: Plugin to create custom posts in Wordpress
Version: 1.0
Author: Scripta Digital | Guilherme Leal
*/

function registerCustomPost() {
    $post_type = 'advogado';

    $labels = array(
        'name'               => 'Advogados',
        'singular_name'      => 'advogado',
        'menu_name'          => 'Advogados',
        'add_new'            => 'Novo advogado',
        'add_new_item'       => 'Adicionar Novo Advogado',
        'edit_item'          => 'Editar Advogado',
        'new_item'           => 'Novo Advogado',
        'view_item'          => 'Visualizar',
        'search_items'       => 'Procurar Advogados',
        'not_found'          => 'Nenhum Advogado encontrado',
        'not_found_in_trash' => 'Nenhum Advogado encontrado na Lixeira',
        'all_items'          => 'Todos os Advogados',
        'archives'           => 'Arquivos de Advogados',
        'attributes'         => 'Atributos do Advogado',
        'insert_into_item'   => 'Inserir no Advogado',
        'uploaded_to_this_item' => 'Enviado para este Advogado',
        'featured_image'     => 'Foto Profissional',
        'set_featured_image' => 'Definir foto de perfil',
        'remove_featured_image' => 'Remover foto',
        'use_featured_image' => 'Usar como imagem em destaque do Advogado',
    );
    
    $args = array(
        'labels'             => $labels,
        'has_archive'        => true,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_nav_menus'  => true,
        'exclude_from_search' => false,
        'query_var'          => true,
        'rewrite'            => true,
        'show_in_rest'       => true,
        'capability_type'    => 'post',
        'menu_icon'          => 'dashicons-businessman',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields'  ), 
        'rewrite'            => array( 'slug' => $post_type ), 
    );

    register_post_type( $post_type , $args );
}


// Metaboxes - Extra Fields

// Phone --------------------------------------------------------<
function phoneField() {
    add_meta_box(
        'phone',
        'Telefone / Whatsapp',
        'renderPhoneField',
        'advogado',
        'advanced',
        'high'
    );
}

function getPhoneData($post){
    $post_id = get_the_ID();

    $phone = get_post_meta($post_id, 'phone', true);

    if (!empty($phone)) {
        return esc_html($phone);
    }

    return 'Telefone não disponível.';

}

function setPhoneData($post_id){
    if(!current_user_can('edit_post', $post_id)){
        return;
    }

    if (isset($_POST['phone']) && !empty($_POST['phone'])) {
        update_post_meta(
            $post_id,
            'phone',
            sanitize_text_field($_POST['phone'])
        );
    }
}

function renderPhoneField($post) {
    $phone = get_post_meta($post->ID, 'phone', true);
    ?>
        <div style="max-width: 460px;">
            <input type="text" id="phone" name="phone" value="<?php echo esc_attr($phone); ?>"
                style="width: 100%; height: 60px; font-size: 1.2rem; padding-left: 1rem">
        </div>
    <?php
}

// Expertise ----------------------------------------------------<
function expertiseField(){
    add_meta_box(
        'expertise',
        'Expertise',
        'renderExpertiseField',
        'advogado',
        'advanced',
        'high'
    );
}

function getExpertiseData($post){
    $post_id = get_the_ID();
    $expertise = get_post_meta($post_id,'expertise',true);
    if(!empty($expertise)){
        return esc_html($expertise);
    }

    return;
}

function setExpertiseData($post_id){
    if(!current_user_can('edit_post', $post_id)){
        return;
    }

    if(isset($_POST['expertise']) && !empty($_POST['expertise'])){
        update_post_meta(
            $post_id,
            'expertise',
            sanitize_text_field($_POST['expertise'])
        );
    }
}

function renderExpertiseField($post){
    $expertise = get_post_meta($post->ID, 'expertise', true)
    ?>
        <div style="max-width: 460px;">
            <input type="text" id="expertise" name="expertise" value="<?php echo esc_attr($expertise); ?>"
            style="width: 100%; height: 60px; font-size: 1.2rem; padding-left: 1rem">
        </div>
    <?php
}


// E-mail -------------------------------------------------------<

function emailField(){
    add_meta_box(
        'email',
        'E-mail',
        'renderEmailField',
        'advogado',
        'advanced',
        'high'
    );
}

function getEmailData($post){
    $post_id = get_the_ID();
    $email = get_post_meta($post_id,'email',true);
    if(!empty($email)){
        return esc_html($email);
    }
    return 'E-mail não disponível';
}

function setEmailData($post_id){
    if(!current_user_can('edit_post', $post_id)){
        return;
    }

    if(isset($_POST['email']) && !empty($_POST['email'])){
        update_post_meta(
            $post_id,
            'email',
            sanitize_email($_POST['email'])
        );
    }
}

function renderEmailField($post){
    $email = get_post_meta($post->ID, 'email', true)
    ?>
        <div style="width: 100%; max-width: 460px; height: 60px">
            <input type="email" id="email" name="email" value="<?php echo esc_attr($email); ?>"
                style="width: 100%; height: 60px; font-size: 1.2rem; padding-left: 1rem">
        </div>
    <?php
}


// Action Hooks

// Register Custom Post
add_action( 'after_setup_theme', 'registerCustomPost');

// Add field in Admin Panel> Custom Post > Post
add_action('add_meta_boxes', 'phoneField');
add_action('add_meta_boxes', 'expertiseField');
add_action('add_meta_boxes', 'emailField');

// Save Data
add_action('save_post', 'setPhoneData');
add_action('save_post', 'setExpertiseData');
add_action('save_post', 'setEmailData');

// shortcodes
add_shortcode('phoneValue', 'getPhoneData');
add_shortcode('expertiseValue', 'getExpertiseData');
add_shortcode('emailValue', 'getEmailData');